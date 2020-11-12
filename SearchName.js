import React, { Component } from 'react';
import {Text,TextInput,View,Button,StyleSheet} from 'react-native';
import { withRouter } from "react-router";


 class SearchName extends Component{
    constructor(props) {
        super(props);
        this.state = {
          username:"",
        };
      }
    
    submitButton = (value) => {
            console.log(value) 
            this.props.history.push('/user-repositories');
            localStorage.setItem('username', value)
    };

    onChangeValue = (event) => {
        this.setState({ username: event.target.value });
    };

    
    render() {
        return (
            <View>
                <View>
                    <Text style={styles.titleStyle}> Welcome!</Text>
                </View>
                <View style={styles.designStyle}>
                    <Text style = {styles.headerStyle}>
                        Hello!
                    </Text>
                    <TextInput style ={styles.inputTextStyle} placeholder='Enter a github username!' onChange={this.onChangeValue}/>
                    <View style={styles.buttonStyle}>
                        <Button 
                                title="Submit"
                                color="#006064"
                                onPress={() =>{
                                        if(this.state.username.length==0){
                                            alert("Oops! Username can not be empty!")
                                        }
                                        else {
                                            this.submitButton(this.state.username)
                                        }
                                }} 
                        />
                    </View>
                </View>
            </View>

            )
    }
}

const styles = StyleSheet.create({
	headerStyle: {
		marginTop:80,
        fontSize: 30,
    },
    
    inputTextStyle:{
        marginTop: 50,
        padding: 20,
        borderWidth:2,
        backgroundColor: "white"
        
    },

    buttonStyle:{
        marginTop:30,
        marginBottom:70,
    },

    titleStyle:{
        color: "black",
        textAlign:"center",
        fontStyle:"italic" ,
        fontSize: 50,
        marginTop:20,
    },

    designStyle: {
        marginTop:100,
        width :500,
        left:"35%",
        borderWidth:2,
        backgroundColor: "beige",
        alignItems:"center",
    }
})

  export default withRouter(SearchName);