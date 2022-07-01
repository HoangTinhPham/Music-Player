/* Steps code wed Music Player
1. Render songs
2. Scroll top
3. Play / pause / seek
4. CD rotate
5. Next / prev
6. Ramdom
7. Next / Repeat when ended
8. Active song
9. Scroll active song into view
10. Play song when click
*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_KEY_1999 = 'MUSIC-1999'

const bodyBackground = $('#body');
const nameSong = $('header h2');
const cdSong = $('.cd .cd-thumb');
const audioSong = $('#audio');
const cd = $('.cd');
const btnTogglePlay = $('.btn-toggle-play');
const progress = $('#progress');
const btnNext = $('.btn-next');
const btnPrev = $('.btn-prev');
const btnRamdom = $('.btn-ramdom');
const btnRepeat = $('.btn-repeat');
const playlist = $('.playlist');
const ownWeb = $('.player .by-tinh');
const btnTheme = $('.theme');
var r = document.querySelector(':root');


const app = {
    currentIndex: 0,
    isplaying: false,
    isRamdom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_KEY_1999)) || {},
    songs: [
        {
            name: 'Solo',
            singer: 'Jennie',
            path: './asset/songs/solo.mp3',
            image: './asset/img/Solo.png',
            brimage: './asset/br-img/Solo.jpg'
        },
        {
            name: 'Một Giấc Mộng Xưa',
            singer: 'A Du Du',
            path: './asset/songs/Mot Giac Mong Xua.mp3',
            image: './asset/img/MotGiacMongXua.jpg',
            brimage: './asset/br-img/motgiacmongxua.jpg'
        },
        {
            name: 'No Regrets',
            singer: 'KSHMR & Yves V',
            path: './asset/songs/kicm.mp3',
            image: './asset/img/kicm.jpg',
            brimage: './asset/br-img/kicm.jpg'
        },
        {
            name: 'Yến Vô Hiết',
            singer: '燕无歇 - 是七叔呢',
            path: './asset/songs/yenvohiet.mp3',
            image: './asset/img/yenvohiet.jpg',
            brimage: './asset/br-img/yenvohiet.jpg'
        },
        {
            name: 'Lạc Trôi',
            singer: 'Sơn Tùng MTP',
            path: './asset/songs/LacTroi.mp3',
            image: './asset/img/LacTroi.jpg',
            brimage: './asset/br-img/LacTroi.jpg'
        },
        {
            name: 'Lily',
            singer: 'Alan Walker',
            path: './asset/songs/Lily.mp3',
            image: './asset/img/Lily.jpg',
            brimage: './asset/br-img/lily.jpg'
        },
        {
            name: 'On The Ground',
            singer: 'Rose',
            path: './asset/songs/OnTheGround.mp3',
            image: './asset/img/OnTheGround.jpg',
            brimage: './asset/br-img/Rose.jpg'
        },
        {
            name: 'Lalisa',
            singer: 'Lisa',
            path: './asset/songs/Lalisa.mp3',
            image: './asset/img/Lalisa.jpg',
            brimage: './asset/br-img/Lalisa.jpg'
        },
        {
            name: 'Hoa Hải Đường',
            singer: 'Jack',
            path: './asset/songs/HoaHaiDuong.mp3',
            image: './asset/img/HoaHaiDuong.jpg',
            brimage: './asset/br-img/HoaHaiDuong.jpg'
        },
        {
            name: 'Don\'t Let Me Down',
            singer: 'The Chainsmokers',
            path: './asset/songs/DontLetMeDown.mp3',
            image: './asset/img/DontLetMeDown.jpg',
            brimage: './asset/br-img/dontletmedown.jpg'
        },
        {
            name: 'Delicate',
            singer: 'Taylor Swift',
            path: './asset/songs/Delicate.mp3',
            image: './asset/img/Delicate.jpg',
            brimage: './asset/br-img/Delicate.png'
        },
        {
            name: 'How You Like That',
            singer: 'Black Pink',
            path: './asset/songs/HowYouLikeThat.mp3',
            image: './asset/img/HowYouLikeThat.jpg',
            brimage: './asset/br-img/HowYouLikeThat.jpg'
        },
        {
            name: 'Vì Mẹ Anh Bắt Chia Tay',
            singer: 'Miu Lê & Karik',
            path: './asset/songs/vimeanhbatchiatay.mp3',
            image: './asset/img/vimeanhbatchiatay.jpg',
            brimage: './asset/br-img/vimeanhbatchiatay.jpg'
        },
        {
            name: 'Thiêu Thân',
            singer: 'Bray & Sofia',
            path: './asset/songs/thieuthan.mp3',
            image: './asset/img/thieuthan.jpg',
            brimage: './asset/br-img/thieuthan.jpg'
        },
        {
            name: 'Past Lives',
            singer: 'BØRNS',
            path: './asset/songs/pastlive.mp3',
            image: './asset/img/passlive.jpg',
            brimage: './asset/br-img/pastlive.jpg'
        },
        {
            name: 'Tay Trái Chỉ Trăng',
            singer: 'Tát Đỉnh Đỉnh',
            path: './asset/songs/taytraichitrang.mp3',
            image: './asset/img/taytraichitrang.jpg',
            brimage: './asset/br-img/taytraichitrang.jpg'
        },
        {
            name: 'Bất Nhiễm',
            singer: 'Mao Bất Dịch (Mao Buyi)',
            path: './asset/songs/batnhiem.mp3',
            image: './asset/img/batnhiem.jpg',
            brimage: './asset/br-img/batnhiem.jpg'
        },
        {
            name: 'Thêm Bao Nhiêu Lâu',
            singer: 'Đạt G',
            path: './asset/songs/thembaonhieulau.mp3',
            image: './asset/img/thembaonhieulau.jpg',
            brimage: './asset/br-img/thembainhieulau.jpg'
        },

    ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_KEY_1999, JSON.stringify(this.config));
    },
    render: function () {
        const html = this.songs.map((song, index) => {
            return `<div class="song-wrap" id="${index}">
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb" style="background-image: url(${song.image})">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="like">
                        <i class="fas fa-heart"></i>
                    </div>
                </div>
            </div>`
        })
        playlist.innerHTML = html.join('');
    },
    handle: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // Xử lý phóng to / thu nhỏ CD
        document.onscroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWith = cdWidth - scrollTop;

            cd.style.width = newCdWith > 0 ? newCdWith + 'px' : 0;
            cd.style.opacity = newCdWith / cdWidth;
        }
        // Xử lý CD quay / dừng
        const CDSongAnimation = cdSong.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // 10s
            iterations: Infinity // Quay vô hạn
        })
        CDSongAnimation.pause();
        // Xử lý ownWeb quay
        setTimeout(() => {
            ownWeb.animate([
                { transform: 'rotate(360deg)' }
            ], {
                duration: 10000, // 10s
                iterations: Infinity // Quay vô hạn
            })
        }, 8000);
        // Xử lý click play
        /* My code
        const btnPause = $('.icon-pause');
        const currentDisplayPause = getComputedStyle(btnPause)
        btnTogglePlay.onclick = () => {
            if (currentDisplayPause.display === 'none') {
                audioSong.play();
                $('.player').classList.add('playing');
            } else {
                audioSong.pause();
                $('.player').classList.remove('playing');
            }
        }
        */
        // F8 code
        btnTogglePlay.onclick = () => {
            if (_this.isplaying) {
                audioSong.pause();
            } else {
                audioSong.play();
            }
        }
        // Khi song dc play
        audioSong.onplay = () => {
            _this.isplaying = true;
            $('.player').classList.add('playing');
            CDSongAnimation.play(); // Play nhạc thì CD quay
            ownWeb.style.display = 'block';
        }
        // Khi song bị pause
        audioSong.onpause = () => {
            _this.isplaying = false;
            $('.player').classList.remove('playing');
            CDSongAnimation.pause(); // Pause nhạc thì CD ngừng quay       
        }

        // Khi tiến độ bài hát thay đổi
        audioSong.ontimeupdate = () => {
            if (audioSong.duration) {
                const progressPercent = Math.floor(audioSong.currentTime / audioSong.duration * 100);
                progress.value = progressPercent;
            }
        }
        // Xử lý khi tua
        progress.onchange = () => {
            const seekTime = progress.value * audioSong.duration / 100;
            audioSong.currentTime = seekTime;
        }
        //Xử lý khi next song
        btnNext.onclick = () => {
            if (_this.isRamdom) {
                _this.ramdomSong()
            } else {
                _this.nextSong();
            }
            audioSong.play();
            _this.render();// render để active bài hát
            _this.scrollToActiveSong();
        }
        btnPrev.onclick = () => {
            if (_this.isRamdom) {
                _this.ramdomSong()
            } else {
                _this.prevSong();
            }
            audioSong.play();
            _this.render();// render để active bài hát 
            _this.scrollToActiveSong();
        }
        // Xử lý click repeat
        btnRepeat.onclick = () => {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            btnRepeat.classList.toggle("active", _this.isRepeat);
        }
        // Xử lý click ramdom
        btnRamdom.onclick = () => {
            _this.isRamdom = !_this.isRamdom;
            _this.setConfig('isRamdom', _this.isRamdom);
            btnRamdom.classList.toggle("active", _this.isRamdom);
        }
        // Xử lý next song when ended
        audioSong.onended = () => {
            if (_this.isRepeat) {
                audioSong.play();
            } else {
                btnNext.click();
            }
        }
        // Lắng nghe hành vi click vào playist
        playlist.onclick = (e) => {
            const songNode = e.target.closest('.song:not(.active)');
            const likeNode = e.target.closest('.like');
            // Xử lý khi click vào song
            if (songNode) {
                if (!likeNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    // khi gán songNode.dataset.index vào biến currentIndex thì nó là chuỗi
                    // nên cần convert ra Number
                    _this.loadCurrentSong();
                    _this.render();
                    audioSong.play();
                }
            }
        }

        // Thay đổi theme
        btnTheme.onclick = () => {
            const gradientFirst = ['#3EECAC','#C9D6FF','#d9a7c7','#06beb6','#1c92d2','#EF3B36','#000046','#014A8E','#BDEEAE'];
            const gradientSecond = ['#EE74E1','#E2E2E2','#fffcdc','#48b1bf','#f2fcfe','#FFFFFF','#1CB5E0','#001953','#08E39E'];
            
            const index = Math.floor(Math.random() * (gradientFirst.length - 1));

            r.style.setProperty('--gradient-first', gradientFirst[index]);
            r.style.setProperty('--gradient-second', gradientSecond[index]);
        }
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    loadCurrentSong: function () {
        bodyBackground.style.backgroundImage = `url(${this.currentSong.brimage})`;
        nameSong.innerHTML = this.currentSong.name;
        cdSong.style.backgroundImage = `url(${this.currentSong.image})`;
        audioSong.setAttribute('src', `${this.currentSong.path}`)
    },
    loadConfig: function () {
        this.isRamdom = this.config.isRamdom;
        this.isRepeat = this.config.isRepeat;
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    ramdomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex || newIndex + 1 === this.currentIndex || newIndex - 1 === this.currentIndex);
        this.currentIndex = newIndex;

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    scrollToActiveSong: function () {
        setTimeout(function () {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: `center`
            })
        }, 300)
    },

    start: function () {
        // Gán cấu hình từ config vào ứng dụng
        this.loadConfig();

        //Định nghĩa các thuộc tính cho object
        this.defineProperties();

        //Lắng nghe xử lý sự kiện (DOM events)
        this.handle();

        //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        // Render Playlist
        this.render();

        // Hiển thị trạng thái ban đầu của button & repeat
        btnRepeat.classList.toggle("active", this.isRepeat);
        btnRamdom.classList.toggle("active", this.isRamdom);
    }
}

app.start()