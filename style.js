const VALUE =[
    {id: "scissors", value: '🤞'},
    {id: "rock", value: '✊'},
    {id: "paper", value: '🖐'},
]
// nếu trừ A-B được 1 hoặc -2 thì thắng
// nếu mà A- B được 0 thì hòa
// nều A- B được những gì khác ở trên thì thua  
let i =0 ;
const handleChange = () =>{
    const computer = document.querySelector("#computer");
    //.textContent giá trị trong thẻ
    computer.textContent = VALUE[i].value
    computer.dataset.id = VALUE[i].id
    if (i === VALUE.length - 1){
        i = 0;
    } else{
        i++;
    }
}
// Viết làm liên tục gọi handleChange
//setInterval: gọi 1 callback liên sau mỗi milisecond
let interval = setInterval(handleChange, 100);

// dom đến danh sách các nút cửa người chơi 
const playerItem = document.querySelectorAll(".user")
//hàm compare (hàm so sánh giữa người và máy)

const compare = (valuePlayer, valueComputer) =>{
    const indexUser = VALUE.findIndex(item => item.id === valuePlayer)
    const indexComputer = VALUE.findIndex(item => item.id === valueComputer)
    let check = indexUser - indexComputer
    if (check ==1 || check==-2){
        return 1
    }else if(check == 0){
        return 0
    }else{
        return -1
    }
}

playerItem.forEach(item => {
    item.addEventListener("click", event =>{
        // dừng lại
        clearInterval(interval)// xóa các setInterval ở trên 
        let valueComputer = document.querySelector("#computer").dataset.id
        let valuePlayer = event.target.id
        playerItem.forEach(_item =>{
            _item.classList.remove("actived")
            _item.style.pointerEvents = "none" // không cho bấm vào
        });
        event.target.classList.add("actived")
        let result = compare(valuePlayer, valueComputer)

        const alerPost = document.createElement('div')
        alerPost.classList.add("alert")// thêm class tên là alert
        let msg =""; //dòng thông tin
        if(result ===1 ){
            msg = "Bạn thắng"
            alerPost.classList.add("alert-success") // thêm màu xanh cho thông bÁO
        }else if(result=== -1){
            msg="Thua"
            alerPost.classList.add("alert-dark")// thêm màu sáng cho thông báo
        }else{
            msg ="hòa"
            alerPost.classList.add("alert-warning")// thêm màu sáng cho thông báo
        }
        alerPost.textContent = msg
        document.querySelector(".notification").appendChild(alerPost)
        document.querySelector("#play-again").classList.remove("d-none")
    })
});
// làm sự kiện bấm chơi lại
document.querySelector(".btn-play-again").addEventListener("click", event =>{
    interval = setInterval(handleChange, 100)
    playerItem.forEach(item =>{
        item.classList.remove("actived")
        item.style.pointerEvents = ""
    })
    document.querySelector(".notification").innerHTML = ""
    document.querySelector("#play-again").classList.add("d-none")
})