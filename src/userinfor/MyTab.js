import React, { Component } from 'react';
import {Icon} from '@ant-design/react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
// import ImagePicker from 'react-native-image-picker';
import { 
    Text, 
    View,
    Image,
    AsyncStorage,
    Dimensions, 
    StyleSheet, 
    FlatList,
    BackHandler,
    ToastAndroid
} from 'react-native';

const {width} = Dimensions.get('window');
const list1 = [
    {key:1,tit:'账户管理'},
    {key:2,tit:'收货地址'},
    {key:3,tit:'我的信息'},
    {key:4,tit:'我的订单'},
    {key:5,tit:'我的二维码'},
    {key:6,tit:'我的积分'},
    {key:7,tit:'我的收藏'}
]
const list2 = [
    {key:1,tit:'居家维修保养'},
    {key:2,tit:'出行接送'},
    {key:3,tit:'我的受赠人'},
    {key:4,tit:'我的住宿优惠'},
    {key:5,tit:'我的活动'}
]
// const options = {
//     title: '请选择',
//     cancelButtonTitle: '取消',
//     takePhotoButtonTitle: '拍照',
//     chooseFromLibraryButtonTitle: '从相册中选取',
//     storageOptions: {
//       skipBackup: true,
//       path: 'images',
//     },
// };

export default class MyTab extends Component {
    // constructor(){
    //     super();
    //     this.state = {
    //         avatarImg:''
    //     }
    // }
    // takephoto = ()=>{
    //     ImagePicker.showImagePicker(options, (response) => {
    //         if (response.didCancel) {
    //           return;
    //         } else if (response.error) {
    //           console.log('Error:', response.error);
    //         } else if (response.customButton) {
    //           console.log('custom:', response.customButton);
    //         } else {  
    //           const source = { uri: response.uri };
    //           this.setState({
    //             avatarImg: source,
    //           },AsyncStorage.setItem('ImageUrl','data:image/jpeg;base64,' + response.data,
    //             ()=>{console.log('store success')}
    //         ));
    //         }
    //       });
    // }
    exithandle = ()=>{
        Actions.login();
        AsyncStorage.getItem('user')
            .then(res=>{
                let user = JSON.parse(res);
                if(user){
                    AsyncStorage.removeItem('user');
                }
                // console.log(user);
            })
        let num = 0;
        BackHandler.addEventListener('back',()=>{
            if(num == 1){
                BackHandler.exitApp();
            }else{
                ToastAndroid.show('确定要退出吗？',100);
                num = 1;
                setTimeout(()=>{num=0},2000);
                return true;
            }
        })
    }

    render() {
        return (
            <View>
                <View style={styles.box}>
                    {/* <Text style={styles.upAvater} onPress={()=>this.takephoto()}>上传头像</Text> */}
                    {/* <Image style={styles.headpic} source={this.state.avatarImg} /> */}
                    <Image style={styles.headpic} source={require('../../assets/headpic.png')} />
                    <Text style={{color:'white'}}>BINNU DHILLON</Text>
                </View>
                <View style={{flexDirection:'row',width:width,height:280,backgroundColor:'#fff',marginBottom:7}}>
                    <FlatList
                        ListHeaderComponent={<View style={styles.header}>
                            <Icon style={{width:35,height:25}} name="user"/>
                            <Text style={{color:'#4f4e4e'}}>我的个人中心</Text>
                        </View>}
                        numColumns={3}
                        data={list1}
                        renderItem={
                            ({item})=><View style={styles.item}>
                                <Icon style={{width:25,height:35}} name='setting'/>
                                <Text style={{color:'#4f4e4e'}}>{item.tit}</Text>
                            </View>}
                    />
                </View>
                <View style={{flexDirection:'row',width:width,height:210,backgroundColor:'#fff'}}>
                    <FlatList
                        ListHeaderComponent={<View style={styles.header}>
                            <Icon style={{width:35,height:25}} name="tag"/>
                            <Text style={{color:'#4f4e4e'}}>E族活动</Text>
                        </View>}
                        numColumns={3}
                        data={list2}
                        renderItem={
                            ({item})=><View style={styles.item}>
                                <Icon style={{width:25,height:35}} name='book'/>
                                <Text style={{color:'#4f4e4e'}}>{item.tit}</Text>
                            </View>}
                    />
                    <View style={{position:'absolute',top:134,right:47,width:70,height:65,alignItems:'center'}}>
                        <Icon style={{width:25,height:35,}} name='file' onPress={()=>Actions.publish()}/>
                        <Text style={{color:'#4f4e4e'}} onPress={()=>Actions.publish()}>我的发布</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',marginTop:6}}>
                    <Button style={{width:150,lineHeight:30,backgroundColor:'red',color:'#fff'}}
                        onPress={this.exithandle}
                    >
                        退出登录
                    </Button>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    box:{
        width:width,
        height:240,
        backgroundColor:"red",
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    headpic:{
        width:100,
        height:100,
        marginBottom:10,
        borderRadius:50,
        borderWidth:2,
        borderColor:'#fff'
    },
    header:{
        width:width,
        height:50,
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15,
        borderBottomWidth:0.5,
        borderBottomColor:'#e6e6e6'
    }, 
    item:{
        width:"33.3%",
        height:70,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:15,
    }
})