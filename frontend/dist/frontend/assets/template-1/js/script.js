window.ladi_viewport = function(b) {
    var a = document;
    b = b ? b : 'innerWidth';
    var c = window[b];
    var d = true;
    if(typeof window.ladi_is_desktop == "undefined" || window.ladi_is_desktop == undefined) {
        window.ladi_is_desktop = !d;
    }
    var e = 960;
    var f = 420;
    var g = '';
    if(!d) {
        g = "width=" + e + ",user-scalable=no,initial-scale=1.0";
    } else {
        var h = 1;
        var i = f;
        if(i != c) {
            h = c / i;
        }
        g = "width=" + i + ",user-scalable=no,initial-scale=" + h + ",minimum-scale=" + h + ",maximum-scale=" + h;
    }
    var j = a.getElementById("viewport");
    if(!j) {
        j = a.createElement("meta");
        j.id = "viewport";
        j.name = "viewport";
        a.head.appendChild(j);
    }
    j.setAttribute("content", g);
};
window.ladi_viewport();
window.ladi_fbq_data = [];
window.ladi_fbq = function() {
    window.ladi_fbq_data.push(arguments);
};
window.ladi_ttq_data = [];
window.ladi_ttq = function() {
    window.ladi_ttq_data.push(arguments);
};


var musicPlayer = document.getElementById("musicPlayer");
var playPauseButton = document.querySelector(".tdk-music");
var isPlaying = false; // Ban đầu là không đang phát
// Hàm để bật hoặc tạm dừng trình phát nhạc và thay đổi hình ảnh của nút
function toggleMusic() {
    if(isPlaying) {
        musicPlayer.pause();
        playPauseButton.classList.remove("playing");
    } else {
        // Thêm xử lý lỗi khi phát nhạc
        musicPlayer.play().catch(function(error) {
            console.log("Error playing audio: ", error);
            isPlaying = false;
            playPauseButton.classList.remove("playing");
        });
        playPauseButton.classList.add("playing");
    }
    isPlaying = !isPlaying; // Chuyển trạng thái đang phát hoặc tạm dừng
}

// Chỉ tự động phát nhạc sau khi người dùng tương tác với trang
document.addEventListener('click', function() {
    if (!isPlaying) {
        toggleMusic();
    }
}, { once: true }); // once: true đảm bảo sự kiện chỉ được kích hoạt một lần