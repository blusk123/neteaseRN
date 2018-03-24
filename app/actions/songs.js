export function changeSongs(songArr) {
    return {
        type: 'CHANGE_SONGS',
        data: songArr
    }
}