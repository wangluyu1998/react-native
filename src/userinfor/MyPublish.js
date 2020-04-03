import React, { Component } from 'react'
import { Text, View,Dimensions, StyleSheet,ToastAndroid } from 'react-native'
import {Icon,Button} from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';

const {width} = Dimensions.get('window');

export default class MyPublish extends Component {
    constructor(){
        super();
        this.state = {
            data:[],
            num:1
        }
    }
    componentDidMount(){
        fetch(`https://cnodejs.org/api/v1/topics?page=${this.state.num}&limit=10`)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({
                data:res.data,
            })
        })
    }
    next = ()=>{
        fetch(`https://cnodejs.org/api/v1/topics?page=${this.state.num+1}&limit=10`)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({
                data:res.data,
                num:this.state.num+1,
            })
        })
    }
    back = ()=>{
        fetch(`https://cnodejs.org/api/v1/topics?page=${this.state.num-1}&limit=10`)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({
                data:res.data,
                num:this.state.num>1 ?this.state.num-1:this.state.num
            })
        })
        if(this.state.num ==1){
            ToastAndroid.show('已经是首页了!', ToastAndroid.SHORT);
        }
    }
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{height:60,flexDirection:'row',justifyContent:'center',alignItems:'center'}} 
                backgroundColor="#ff0000">
                    <Icon style={styles.left} name='left' onPress={()=>Actions.pop()}/>
                    <Icon style={styles.more} name='setting'/>
                    <Text style={{color:'#fff',fontSize:20}}>我的发布</Text>
                </View>
                <View style={{width:width,height:510,marginTop:5,backgroundColor:'#fff'}}>
                    {
                        this.state.data.map((item,idx)=>(
                            <View style={{flexDirection:'row'}}>
                                <Text key={idx} style={styles.txt}>
                                    {item.title.length >15 ? item.title.substr(0,15)+'...' : item.title}
                                </Text>
                                <View style={styles.time}>
                                    <Text style={{color:'#4f4e4e'}}>{item.create_at.substr(0,10)}</Text>
                                </View>
                                <View style={styles.ifReturn}>
                                    { item.reply_count >10 ? 
                                        <Text style={{color:'#4f4e4e'}}>已回复</Text> : 
                                        <Text style={{color:'red'}}>待回复</Text>
                                    }
                                </View>
                            </View>
                        ))
                    }
                </View>
                <View style={styles.footer}>
                    <Button style={styles.btnleft} onPress={this.back}>上一页</Button>
                    <Text style={styles.pagenum}>第 {this.state.num} 页</Text>
                    <Button style={styles.btnright} onPress={this.next}>下一页</Button>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    left:{
        color:'#fff',
        position:'absolute',
        left:11
    },
    more:{
        color:'#fff',
        position:'absolute',
        right:15
    },
    txt:{
        width:width*0.5,
        lineHeight:50,
        paddingLeft:12,
        borderBottomWidth:1,
        borderBottomColor:'#e6e6e6',
        color:'#4f4e4e'
    },
    footer:{
        flexDirection:'row',
        width:width,
        height:100,
        justifyContent:'flex-start',
        backgroundColor:'#fff',
        alignItems:'center'
    },
    btnleft:{
        width:100,
        position:'absolute',
        left:width*0.08,
        backgroundColor:'red',
        lineHeight:35,
        color:'#fff'
    },
    btnright:{
        width:100,
        position:'absolute',
        left:width*0.7,
        backgroundColor:'red',
        lineHeight:35,
        color:'#fff'
    },
    pagenum:{
        position:'absolute',
        left:width*0.43,
        top:40,
        fontSize:15,
    },
    time:{
        width:width*0.3,
        height:50,
        alignItems:'flex-end',
        justifyContent:'center',
        borderBottomWidth:1,
        borderBottomColor:'#e6e6e6',
        color:'#4f4e4e'
    },
    ifReturn:{
        width:width*0.2,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:1,
        borderBottomColor:'#e6e6e6'
    }
})