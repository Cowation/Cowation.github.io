let eventSource = new EventSource("https://EmbeddedDiscord.cowation.repl.co/events"),
	messageBox = null,
	nameBox = null,
	chatBox = null,
	xhrSend = new XMLHttpRequest()

function sendMessage() {
	if (messageBox.value.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') == '' || nameBox.value.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') == '') {
		messageBox.value = ""

		return false
	} else {
		xhrSend.abort()
		xhrSend.open("POST", "https://EmbeddedDiscord.cowation.repl.co/message?message=" + encodeURIComponent(messageBox.value) + "&name=" + encodeURIComponent(nameBox.value))
		xhrSend.send(null)
		
		messageBox.value = ""
		
		return false
	}
}

eventSource.addEventListener("message", (event) => {
	const data = JSON.parse(event.data);

	const parentDiv = document.createElement("div");
	const nameSpan = document.createElement("span")
	nameSpan.innerText = data.author + ": ";
	nameSpan.style.color = "#7289DA";
	const messageSpan = document.createElement("span");
	messageSpan.innerText = data.content;

	parentDiv.appendChild(nameSpan);
	parentDiv.appendChild(messageSpan);

	chatBox.appendChild(parentDiv)

	chatBox.scrollTop = chatBox.scrollHeight
});

window.onload = () => {
	messageBox = document.getElementById("message-box");
	nameBox = document.getElementById("name-box")
	chatBox = document.getElementById("chat-box");
}