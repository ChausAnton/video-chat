import jsCookie from 'js-cookie';
import UrlParse from 'url-parse';

const USER_COOKIE = 'mediasoup-demo.user';
const DEVICES_COOKIE = 'mediasoup-demo.devices';
const AUTH = 'idToken';
const ROOMID = 'roomId';
const ROOM_OWNER = 'roomOwner'

export function setRoomOwner(roomOwenr) {
	return jsCookie.set(ROOM_OWNER, roomOwenr);
}	

export function getRoomOwner() {
	return jsCookie.getJSON(ROOM_OWNER);
}


export function getUser()
{
	return jsCookie.getJSON(USER_COOKIE);
}

export async function setAccess(idToken) {
	if(idToken)
		jsCookie.set(AUTH,  idToken);
}

export function getAccess() {
	return jsCookie.getJSON(AUTH);
}

export function saveRoomId(roomId) {
	if(!roomId)
		return
	jsCookie.set(ROOMID,  roomId);
}

export function setRoomIdToUrlParam() {
	const urlParser = new UrlParse(window.location.href, true);
	if(urlParser.query.roomId)
		return 

	const roomId = jsCookie.getJSON(ROOMID);
	const url = new URL(window.location.href)
	url.searchParams.append(ROOMID, roomId)
	window.location.href = url
}

export function removeAccess() {
	jsCookie.set(AUTH,  '');
}

export function setUser(user)
{
	const data = {
		displayName: user.name,
		picture: user.picture,
		email: user.email,

	}
	jsCookie.set(USER_COOKIE, data);
}

export function getDevices()
{
	return jsCookie.getJSON(DEVICES_COOKIE);
}

export function setDevices({ webcamEnabled })
{
	jsCookie.set(DEVICES_COOKIE, { webcamEnabled });
}
