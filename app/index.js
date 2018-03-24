import React, { PureComponent } from 'react'
import { View} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import App from './containers/app'
import { Provider } from 'react-redux'
import Store from './store/store'
import MCPlayer from './containers/MCPlayer/mcplayer'

const store = Store()
  
export default class AppSplash extends PureComponent {
    componentDidMount() {
        SplashScreen.hide()
    }
    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <App />
                    <MCPlayer />
                </View>
            </Provider>
        )
    }
}