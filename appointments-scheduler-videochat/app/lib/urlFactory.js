let protooPort = 4443;

if (window.location.hostname === 'test.mediasoup.org')
	protooPort = 4444;

export function getProtooUrl({ roomId, peerId, password })
{
	const hostname = "withvideo.org"
	// const hostname = window.location.hostname

	return `wss://${hostname}:${protooPort}/?roomId=${roomId}&peerId=${peerId}&password=${password}`;
}
