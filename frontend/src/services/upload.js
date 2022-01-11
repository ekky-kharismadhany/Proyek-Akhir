export default function upload(file) {
    const formData = new FormData();
    formData.append("filename", file);
    console.log(formData);
    fetch(
        "http://localhost:5000/upload",
        {
            method: 'POST',
            body: formData
        }
    ).then((response) => response.json()).then((result) => {
        console.log(result);
        alert('Success', result);
    }).catch((error) => {
        alert('Error:', error);
    });
}