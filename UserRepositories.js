import React from 'react';
import {View,FlatList,SafeAreaView, Text, StyleSheet, Button} from 'react-native';
import axios from 'axios';
import { withRouter } from "react-router";


class UserRepositories extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          repositories:[],
          sortedRepo:[],
          finalRepos:[]
        };
    }
 
    getUserRepositories = ()=> {
        let username= localStorage.getItem('username');
        console.log(username)
        axios.get(`https://api.github.com/users/`+ username +`/repos?type=all`)
        .then((result)=> {
          this.setState({
              repositories:result.data

        })
        let sortedStarsDsc;
        sortedStarsDsc= this.state.repositories.sort((a,b)=>{
             return parseInt(b.stargazers_count)  - parseInt(a.stargazers_count);
        }) 
        this.setState({
              sortedRepo:sortedStarsDsc
        })

        let auxRepo=[]
        for(let i =0;i<10;i++){
            if(this.state.sortedRepo[i]!=null){
                auxRepo.push(this.state.sortedRepo[i])
            }
            else
                break;
        }
        this.setState({
            finalRepos:auxRepo
        }) 

        console.log(auxRepo)
        })
        .catch((e)=>{
          console.log("error",e);
          this.setState({
            repositories:[],
          })
        });
    }

    componentDidMount(){
        this.getUserRepositories();
    }

    goToHome=()=>{
        this.props.history.push('');
    }


    render(){
        const { finalRepos } = this.state;
        let username= localStorage.getItem('username');
        const Item = ({ name,stargazers_count  }) => (
            <View style={styles.itemStyle}>
                    <Text style={styles.nameStyle}>{name}<br/><br/>{stargazers_count} ⭐</Text>
            </View>
        );
        const renderItem = ({ item }) => (
            <Item name={item.name} stargazers_count={item.stargazers_count}/>
        );
       
        return(
            
            <View>
                <Text style = {styles.titleStyle}><i>The name you are looking for is: <b><u>{username}</u></b></i><br/>
                <Text style ={styles.subtitleStyle}>Below you can see the list of repositories the user owns or contributes:</Text>
                </Text>
                <SafeAreaView>
                        <FlatList
                            data={finalRepos} 
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                </SafeAreaView>
                <View style={styles.buttonStyle}>
                            <Button 
                                title="Go back"
                                color="#006064"
                                onPress={this.goToHome}>
                            </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleStyle:{
        color: "black",
        fontSize: 25,
        marginTop:20,
        padding:20,
    },

    subtitleStyle:{
        color: "black",
        fontSize: 17,
        fontFamily:"Verdana"
    },

    itemStyle:{
        backgroundColor: 'beige',
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 20,
    },

    nameStyle:{
        fontSize: 21,
        fontStyle:'italic'
    },

    buttonStyle:{  
        marginLeft:20,
        marginTop:30,
        marginBottom:30,
        width:150
    },
})

export default withRouter(UserRepositories);