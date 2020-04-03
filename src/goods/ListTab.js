import React, { Component } from 'react'
import { View,Text,TextInput,Image,StyleSheet,ScrollView } from 'react-native'

const num = [0,1,2,3,4,5];

const styles = StyleSheet.create({
    search:{
        width:22,
        height:22,
        marginLeft:200
    },
    item:{
        height:250,
        width:'47%',
        marginLeft:'2%',
        marginTop:'2%',
        fontSize:10,
        backgroundColor:'#fff'
    },
    img:{
        width:'70%',
        height:170,
        marginLeft:'15%',
        marginBottom:'4%'
    }
})

export default class List extends Component {
    render() {
        return (
            <ScrollView>
            <View style={{height:50,justifyContent:"center",backgroundColor:'#fff'}}>
                <View style={{
                    width:'80%',
                    height:40,
                    marginLeft:'10%',
                    backgroundColor:'#e6e6e6',
                    flexDirection:'row',
                    alignItems:'center',
                    paddingLeft:10,
                }}>
                    <TextInput placeholder="请输入商品名称" placeholderTextColor="#8a8a8a"/>
                    <Image style={styles.search} source={require('../../assets/search.png')}/>
                </View>
            </View>
            <View style={{
                height:45,
                flexDirection:'row',
                alignItems:'center',
                paddingLeft:15,
                backgroundColor:'#fff'
            }}>
                <Text style={{color:'red',paddingLeft:35}}>综合</Text>
                <Text style={{paddingLeft:60}}>销量</Text>
                <Text style={{paddingLeft:60}}>新品</Text>
                <Text style={{paddingLeft:60}}>价格</Text>
                <Text style={{paddingLeft:60}}>信用</Text>
            </View>
            <View style={{height:800,flexDirection:'row',flexWrap:'wrap',backgroundColor:'#e6e6e6'}}>
                {
                    num.map((val)=>(
                        <View key={val} style={styles.item}>
                            {
                                val % 2 ==0 ?
                                    <Image style={styles.img} source={require('../../assets/corn0.jpg')}/>
                                : <Image style={styles.img} source={require('../../assets/corn1.jpg')}/>
                            }
                            <Text style={{width:'90%',marginLeft:'5%',marginBottom:'3%',color:'#707070'}}>
                                Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳
                            </Text>
                            <Text style={{width:'90%',marginLeft:'5%',color:'red'}}>36.00</Text>
                        </View>
                    ))
                }
            </View>
            </ScrollView> 
        )
    }
}