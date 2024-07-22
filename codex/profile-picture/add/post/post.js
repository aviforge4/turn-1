document.addEventListener('DOMContentLoaded', function () {
    // Open post section and hide other sections
    document.getElementById('addPost').addEventListener('click', function () {
        document.getElementById('shortSection').style.display = 'none';
        document.getElementById('postSection').style.display = 'block';
    });

    // Close post section
    document.querySelector('.close-post-icon').addEventListener('click', function () {
        document.getElementById('postSection').style.display = 'none';
    });

    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // Choose photos and videos
    document.getElementById('postFile').addEventListener('change', function (event) {
        displaySelectedMedia(event, swiper);
    });

    // Choose music
    document.getElementById('postMusicFile').addEventListener('change', function (event) {
        displaySelectedMusic(event);
    });
});

function displaySelectedMedia(event, swiper) {
    const swiperWrapper = document.getElementById('uploadedPostMedia');
    const postDisplaySection = document.getElementById('postDisplaySection');
    const files = event.target.files;

    // Check if any new files are selected
    if (files.length > 0) {
        swiperWrapper.innerHTML = ''; // Clear existing images
        postDisplaySection.style.display = 'block'; // Show the container

        Array.from(files).forEach(file => {
            const swiperSlide = document.createElement('div');
            swiperSlide.classList.add('swiper-slide');
            const mediaElement = document.createElement(file.type.startsWith('video/') ? 'video' : 'img');
            mediaElement.src = URL.createObjectURL(file);
            if (file.type.startsWith('video/')) {
                mediaElement.controls = true;
                mediaElement.setAttribute('controlsList', 'nodownload'); // Ensure no download option is shown
            }
            mediaElement.setAttribute('oncontextmenu', 'return false'); // Disable right-click
            swiperSlide.appendChild(mediaElement);
            swiperWrapper.appendChild(swiperSlide);
        });

        swiper.update(); // Update Swiper with new slides
    }
}

function displaySelectedMusic(event) {
    const musicPlayer = document.getElementById('uploadedPostMusic');
    const postMusicDisplaySection = document.getElementById('postMusicDisplaySection');
    const file = event.target.files[0];

    if (file) {
        musicPlayer.src = URL.createObjectURL(file);
        postMusicDisplaySection.style.display = 'block';
        musicPlayer.setAttribute('controlsList', 'nodownload'); // Ensure no download option is shown
        musicPlayer.setAttribute('oncontextmenu', 'return false'); // Disable right-click
    } else {
        postMusicDisplaySection.style.display = 'none';
    }
}
