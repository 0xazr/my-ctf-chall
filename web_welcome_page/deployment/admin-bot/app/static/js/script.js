function visit() {
    const url = document.getElementById("url").value;
    console.log("test")
    fetch("/visit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url: url
        })
    })
}

const submit = document.getElementById("submit");
if(submit) {
    submit.addEventListener("click", visit);
}