import React from "react";
import Canlendar from "./Canlendar.js";

class BECanlendar extends React.Component{
	constructor(){
		super();

		var d = new Date();
		//b表示开始，e表示结束
		this.state = {
			"byear" : d.getFullYear(),
			"bmonth" : d.getMonth() + 1,
			"bday" : d.getDate(),
			"bshowCanlendar" : false,
			"eyear" : d.getFullYear(),
			"emonth" : d.getMonth() + 1,
			"eday" : d.getDate(),
			"eshowCanlendar" : false,
			"showchoosebox" : false
		}
	}

	onpick1({year , month , day}){
		this.setState({"byear" : year , "bmonth" : month , "bday" : day , "bshowCanlendar" : false});
	}

	onpick2({year , month , day}){
		this.setState({"eyear" : year , "emonth" : month , "eday" : day , "eshowCanlendar" : false});
	}

	//发生state的改变的时候触发
	componentWillUpdate(props,state){
		this.props.onpick(state.bmonth,state.byear,state.bday,state.eday,state.emonth,state.eyear);

	}

	showCanlendar1(){
		var props = {
			year : this.state.byear,
			month : this.state.bmonth,
			day : this.state.bday,

		}

		
		if(this.state.bshowCanlendar){
			return <Canlendar 
				{...props} 
				{...this.props}
				onpick={(this.onpick1).bind(this)} 
			/>;
		}
	}
 

	showCanlendar2(){
		var props = {
			year : this.state.eyear,
			month : this.state.emonth,
			day : this.state.eday,
		}
		if(this.state.eshowCanlendar){
			return <Canlendar 
			{...props} 
			{...this.props}
			onpick={(this.onpick2).bind(this)}
			/>;
		}
	}

	//计算日期间隔
	calcGap(){
		//两个日期
		var date1 = new Date(this.state.byear,this.state.bmonth,this.state.bday);
		var date2 = new Date(this.state.eyear,this.state.emonth,this.state.eday);
		var gap = date2 - date1;

		var gday = gap / 1000 / 60 / 60 / 24;

		return <div>{gday}天</div>
	}

	componentDidMount(){
		var self = this;
		//窗口的点击事件，当点击到外面的时候，关闭选择框
		$("html").click(function(event){
			var o = self.refs.BECanlendar;
			if($(event.target).parents(o).length == 0){
				self.setState({"showchoosebox" : false , "bshowCanlendar" : false ,"eshowCanlendar" : false  })
			}
		});
	}

	showChoosebox(){
		return 	<div className="chooseBox">
			<input type="button" value="确定" className="submitbtn" onClick={()=>{this.setState({"showchoosebox" : false})}}/>
		 
			<div className="begin">
				开始日期
				<div className="begin_result result"  >
					<div onClick={()=>{this.setState({"bshowCanlendar" : !this.state.bshowCanlendar , "eshowCanlendar" : false})}}>
						{this.state.byear}年{this.state.bmonth}月{this.state.bday}日
						<span className="glyphicon glyphicon-calendar canlendarbtn"></span>
					</div>
						
					{this.showCanlendar1()}
				</div>
			</div>
			<div className="days">
				{this.calcGap()}
			</div>
			<div className="end">
				结束日期
				<div className="end_result result" >
					<div onClick={()=>{this.setState({"eshowCanlendar" : !this.state.eshowCanlendar , "bshowCanlendar" : false})}}>
						{this.state.eyear}年{this.state.emonth}月{this.state.eday}日
						<span className="glyphicon glyphicon-calendar canlendarbtn"  ></span>
					</div>
					
					{this.showCanlendar2()}
				</div>
			</div>
		</div>
	}

	render(){
		return (
			<div className="BECanlendar" ref="BECanlendar">
				<div className="result" onClick={()=>{this.setState({"showchoosebox" : !this.state.showchoosebox})}}>
					{this.state.byear}年{this.state.bmonth}月{this.state.bday}日 - {this.state.eyear}年{this.state.emonth}月{this.state.eday}日
					<span className="glyphicon glyphicon-calendar canlendarbtn"></span>
				</div>
				{this.state.showchoosebox && this.showChoosebox()}
			</div>
		);
	}
}

export default BECanlendar;