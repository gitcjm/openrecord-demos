/**
 * cjm@2019-2-21
 */

// 引用 sample.db 数据库
const Store = require('openrecord/store/sqlite3');

const store = new Store({
   type: 'sqlite3',
   file: './db/sample.db',
   autoLoad: true
});

// 创建 Model
class Track extends Store.BaseModel {
    static definition() {
        this.attribute('TrackId', 'integer', {primary: true});
        this.hasMany('track_playlists',
            {model: 'PlaylistTrack', from: 'TrackId', to: 'TrackId'});
        this.hasMany('playlists',
            {model: 'Playlists', through: 'track_playlists'});
    }
}
class Playlist extends Store.BaseModel {
    static definition() {
        this.attribute('PlaylistId', 'integer', {primary: true});
        this.hasMany('playlist_tracks',
            {model: 'PlaylistTrack', from: 'PlaylistId', to: 'PlaylistId'});
        this.hasMany('tracks',
            {model: 'Track', through: 'playlist_tracks'});
    }
}
class PlaylistTrack extends Store.BaseModel {
    static definition() {
        this.tableName = 'playlist_track';
        this.attribute('PlaylistId', 'integer');
        this.attribute('TrackId', 'integer');
        this.belongsTo('playlists',
            {model: 'Playlist', from: 'PlaylistId', to: 'PlaylistId'});
        this.belongsTo('tracks',
            {model: 'Track', from: 'TrackId', to: 'TrackId'});
    }
}

store.Model(Track);
store.Model(Playlist);
store.Model(PlaylistTrack);

// 操作数据库
async function openDB() {
    await store.connect();
    await store.ready();
    console.log('connected');
}

async function closeDB() {
    await store.close();
    console.log('closed');
}

async function operateDB() {
    const track = await Track.find(1).include('playlists');
    const playlists = await track.playlists;
    playlists.forEach(l => console.log(l.PlaylistId));

    // Follow is my test, but failed.
    // const playlist = await Playlist.find(1).include('tracks');
    // const tracks = await playlist.tracks;
    // tracks.forEach(t => console.log(t.TrackId));
}

// main
async function main() {
    await openDB();
    await operateDB();
    await closeDB();
}

main();
