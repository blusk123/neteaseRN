import React, { PureComponent } from 'react'
import Video from 'react-native-video'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/musicurl'
import * as sliderActionCreators from '../../actions/slider'
import * as indexActionCreators from '../../actions/mc_index'

class MCPlayer extends PureComponent {

    loadStart = () => {}
    setTime = (e) => {
        const { allTime } = this.props.slider
        this.props.update.update({currentTime: e.currentTime})
    }
    onEnd = () => {
        this.props.update.update({play: false})
        const { mcindex, songs } = this.props 
        const index = mcindex == (songs.length - 1) ? 0 : mcindex + 1
        this.props.updateIndex.update(index)
    }
    videoError = () => {}
    onBuffer = () => {}
    onTimedMetadata = () => {}
    setDuration = (e) => {
        this.props.update.update({allTime: e.duration, play: true, reset: false})
    }
    getMusicFn = (item) => {
        this.props.fetchMusic.getMusic(item)
    }
    componentWillReceiveProps(newProps) {
        const { mcindex, songs } = newProps
        const oldSongs = this.props.songs
        const currentIndex = this.props.mcindex
        const oldSliderDone = this.props.slider.sliderDone
        const newSilderDone = newProps.slider.sliderDone
        if(mcindex !== currentIndex) {
            const currentId = currentIndex && oldSongs[currentIndex].id
            const id = songs[mcindex].id
            this.getMusicFn({id})
        }
        if(newSilderDone && newSilderDone !== oldSliderDone) {
            console.log(newSilderDone, oldSliderDone)
            this.player.seek(newSilderDone)
        }
    }
    render() {
        const { music, mcindex, slider } = this.props
        return (
            music.data.data ? 
            <Video source={{uri: music.data.data[0].url}}   // Can be a URL or a local file.
                ref={(ref) => {
                    this.player = ref
                }}                                      // Store reference
                rate={1.0}                              // 0 is paused, 1 is normal.
                volume={1.0}                            // 0 is muted, 1 is normal.
                muted={false}                           // Mutes the audio entirely.
                paused={!slider.play}                          // Pauses playback entirely.
                resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                // repeat={true}                           // Repeat forever.
                playInBackground={true}                // Audio continues to play when app entering background.
                playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                progressUpdateInterval={500.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                onLoadStart={this.loadStart}            // Callback when video starts to load
                onLoad={this.setDuration}               // Callback when video loads
                onProgress={this.setTime}               // Callback every ~250ms with currentTime
                onEnd={this.onEnd}                      // Callback when playback finishes
                onError={this.videoError}               // Callback when video cannot be loaded
                onBuffer={this.onBuffer}                // Callback when remote video is buffering
                onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                style={{height: 0, width: 0}} /> : null
        )
    }
}
function mapStateToProps(state) {
    const { mcindex, music, songs, slider } = state
    return {
        mcindex,
        music,
        songs,
        slider
    }
}
function mapDispatchToProps(dispatch){
    return {
        fetchMusic: bindActionCreators(actionCreators, dispatch),
        update: bindActionCreators(sliderActionCreators, dispatch),
        updateIndex: bindActionCreators(indexActionCreators, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MCPlayer)