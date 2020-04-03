import React, {Component} from 'react';
import {View,Text,Image,TextInput,AsyncStorage,TouchableOpacity,Alert,ToastAndroid} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils';

export default class Login extends Component {
  constructor(){
    super();
    this.state = {
      username:'',
      pwd:'',
    }
  }
  userhandle = (text)=>{
    this.setState({username:text})
  }
  pwdhandle = (text)=>{
    this.setState({pwd:text})
  }
  register = ()=>{
      if(this.state.username != '' && this.state.pwd != ''){
        myFetch.post('/register',{
            username:this.state.username,
            pwd:this.state.pwd
          }).then(res=>{
            if(res.data.token == '1'){
                Alert.alert('用户已存在！');
            }else if(res.data.token == '2'){
                Alert.alert('注册失败！');
            }else{
                AsyncStorage.setItem('msg',JSON.stringify(res.data))
                  .then(()=>{
                    ToastAndroid.show('注册成功',10);
                    Actions.login();
                 })
            }
          })
      }else{
          Alert.alert("用户名和密码均不能为空");
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
            <TouchableOpacity 
                style={{
                    width: '80%',
                    height: 40,
                    backgroundColor: '#ccc',
                    marginTop: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={this.register}>
                <Text>立即注册</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}