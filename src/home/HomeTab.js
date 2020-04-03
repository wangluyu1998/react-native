import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TextInput,
    StyleSheet,
    Dimensions
} from 'react-native';
import Button from 'react-native-button';
import Swiper from 'react-native-swiper';
import {Icon} from '@ant-design/react-native';

const {width} = Dimensions.get('window');
const items = [
    {key:require('../../assets/part01.png'),title:'居家维修保养'},
    {key:require('../../assets/part02.png'),title:'住宿优惠'},
    {key:require('../../assets/part03.png'),title:'出行接送'},
    {key:require('../../assets/part04.png'),title:'E族活动'}
];

export default class HomeTab extends Component {
    render() {
        return (
            <View>
                <View style={{height:50,justifyContent:"center",backgroundColor:'red'}}>
                    <View style={{
                        width:'80%',
                        height:32,
                        marginLeft:'5%',
                        flexDirection:'row',
                        backgroundColor:'#fff',
                        alignItems:'center',
                        paddingLeft:10,
                        borderRadius:25,
                        opacity:0.6                   
                    }}>
                        <Image style={styles.search} source={require('../../assets/search0.png')}/>
                        <TextInput placeholder="请输入您要搜索的关键字" placeholderTextColor="#fff"/>
                        <Image style={styles.cart} source={require('../../assets/cart.png')}/>
                    </View>
                </View>
                <View style={{height:210,width:width}}>
                    <Swiper
                        autoplay={true}
                        height={230}
                        width={width}
                        autoplayTimeout={3}
                        dotColor='#fff'
                        activeDotColor='red'
                        horizontal={true}
                        loop={true}
                    >
                        <Image style={{height:230,width:width}}
                            source={require('../../assets/banner01.jpg')}
                        />
                        <Image style={{height:230,width:width}}
                            source={require('../../assets/banner02.jpg')}
                        />
                    </Swiper>
                </View>
                <View style={{width:width,height:450}}>
                    {
                        items.map((item,index)=>(
                            <View style={styles.box} key={index}>
                                <Image style={{width:70,height:70,marginRight:25}} source={item.key}/>
                                <Text style={{width:width*0.7,color:"#4f4e4e",fontSize:15}}>{item.title}</Text>
                                <Icon color="lightgray" name="right"/>
                            </View>
                        ))
                    }
                    <Button style={styles.btn}>发布需求</Button>
                    <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
                        <Text style={{fontSize:12,color:'#8a8a8a'}}>@E族之家 版权所有</Text>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    search:{
        width:22,
        height:22,
    },
    cart:{
        width:28,
        height:28,
        marginLeft:195
    },
    box:{
        width:width,
        height:90,
        backgroundColor:'white',
        marginTop:8,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20
    },
    btn:{
        width:width*0.8,
        height:50,
        color:'#fff',
        textAlign:'center',
        lineHeight:50,
        backgroundColor:'red',
        marginTop:30,
        marginLeft:width*0.1
    }
})