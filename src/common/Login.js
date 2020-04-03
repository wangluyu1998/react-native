import React, {Component} from 'react';
import {View,Text,Image,TextInput,AsyncStorage,TouchableOpacity,Alert} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils';

export default class Login extends Component {
  constructor(){
    super();
    this.state = {
      username:'',
      pwd:'',
      isLoading:false
    }
  }
  userhandle = (text)=>{
    this.setState({username:text})
  }
  pwdhandle = (text)=>{
    this.setState({pwd:text})
  }
  login = ()=>{
    if(this.state.username != '' && this.state.pwd != ''){
      this.setState({isLoading:true});
      myFetch.post('/login',{
        username:this.state.username,
        pwd:this.state.pwd
      }).then(res=>{
        AsyncStorage.setItem('user',JSON.stringify(res.data))
          .then(()=>{
            this.setState({isloading:false});
            Actions.home();
          })
      })
    }else{
      Alert.alert('用户名和密码不能为空！');
    }
  }
  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center'}}>
        <View
          style={{ alignItems: 'center'}}>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="请输入用户名" placeholderTextColor='gray'
              onChangeText={this.userhandle}
            />
          </View>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="lock" color="red"/>
            <TextInput placeholder="请输入密码" placeholderTextColor='gray'
              onChangeText={this.pwdhandle} secureTextEntry={true}
            />
          </View>
          <View style={{flexDirection:'row',height:40,marginTop:30}}>
            <TouchableOpacity 
                style={{
                    width: '20%',
                    height: 40,
                    backgroundColor: '#ccc',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight:'10%'
                }}
                onPress={this.login}>
                <Text>登录</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{
                    width: '20%',
                    height: 40,
                    backgroundColor: '#ccc',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={()=>Actions.register()}>
                <Text>注册</Text>
            </TouchableOpacity>
          </View>
        </View>
        {
            this.state.isLoading
            ?<View style={{width:500,height:100,justifyContent:'center',alignItems:'center'}}>
              <Text style={{color:'red',fontSize:16}}>正在登录...</Text>
            </View>
            :null
        }
      </View>
    );
  }
}