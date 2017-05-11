define(function () {
	return {
		// Default assets
		assets: [],

		// Style prefix
		stylePrefix: 'am-',

		// Url where uploads will be send, set false to disable upload
		upload: 'http://localhost:8081/',//'http://localhost/assets/upload',

		// Upload auth
		token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTcxMDYwNjk4MTh9.Q1aPJAzWLLADKpCwP85dsTXnhzJdVZkuEbDxsWKWdiM',

		// Text on upload input
		uploadText: 'Drop files here or click to upload',

		// Label for the add button
		addBtnText: 'Add image',
	};
});
