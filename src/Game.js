import React, { Component } from 'react'
import { Text, View, TextInput, Button, Alert } from 'react-native'

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chanceCount: 0,
			input: '',
			showStatus: false,
			statusMessage: 'No message',
			random : ''
		}
	}
	
	onSubmitPress = () => {
		this.setState({ showStatus: false });
		let { chanceCount, input } = this.state;
		console.log(input);
		if(input==null || input===undefined){
			Alert.alert(
				'Empty Field',
				'Please Enter a valid number'
			)
			return false;
		}
		if(chanceCount==0)
		{
			let random = Math.floor(Math.random()*100);
			this.setState({ random : random });
			this.validateNum(random);
		}
		else if(chanceCount==9)
		{
			this.setState({
				chanceCount: 0,
				input: '',
				showStatus: true,
				statusMessage: 'Game Restarted, You missed all your 10 chances',
				random : ''
			})
		}
		else {
			this.validateNum();
		}
	}

	validateNum = (random1) => {
		let { random, input } = this.state;
		let randomNum = random;
		if(random === '') randomNum = random1;
		console.log(randomNum);
		input = Number(input);
		if(input===randomNum){
			this.setState({
				statusMessage: 'Yeee!!! You win, Game is restarted',
				showStatus : true,
				chanceCount : 0,
				input: '',
				random : ''
			})
		}
		else if(input > randomNum){
			this.setState({
				statusMessage: `Guess was high, chance left: ${9-this.state.chanceCount-1}`,
				showStatus: true,
				chanceCount : this.state.chanceCount+1,
				input: ''
			})
		}
		else if(input < randomNum){
			this.setState({
				statusMessage: `Guess was Low, chance left: ${9-this.state.chanceCount-1}`,
				showStatus: true,
				chanceCount : this.state.chanceCount+1,
				input: ''
			})
		}
	}
	render() {

		const { inputStyle, headText, textStyle, inputWrapper, statusWrapper, statusText, descreptionStyle } = styles;
		return (
			<View>
				<Text style={headText} >Number Guess Game</Text>
				<View style={descreptionStyle}>
					<Text style={textStyle}>
						Guess Game :- We have selected a random number betweeen 0 to 100.
						You have 10 guesses with you and you have to guess the number.
					</Text>
				</View>

				<View style={inputWrapper}>
					<TextInput
						style={inputStyle}
						onChangeText={(text) => this.setState({ input: text, showStatus: false })}
						value={this.state.input}
						placeholder="Enter your Guess"
						keyboardType="numeric"
					/>

					<Button
						onPress={this.onSubmitPress}
						title="Check"
						color="#26a69a"
					/>
				</View>
				{
					this.state.showStatus && 
					<View style={ statusWrapper } >
						<Text style={statusText} >{ this.state.statusMessage }</Text>
					</View>
				}
			</View>
		)
	}
}

const styles = {
	buttonStyle: {

	},
	inputStyle: {
		height: 40,
		marginBottom: 40
	},
	textStyle: {
		fontSize: 20,
		marginBottom: 10,
		marginLeft: 10
	},
	inputWrapper : {
		padding: 20
	},
	statusWrapper :{
		backgroundColor : '#546e7a',
		padding: 15,
		margin : 20
	},
	statusText : {
		color: '#fff'
	},
	descreptionStyle: { 
		borderLeftWidth: 5, 
		borderLeftColor: "#000", 
		marginLeft: 8, 
		marginBottom: 40 
	},
	headText: {
		fontSize: 24,
		textAlign: 'center',
		marginBottom: 15,
		color: '#ff1111'
	}
}

export default Game;