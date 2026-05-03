/*:
 * @plugindesc Skip movie/video dengan tombol atau klik mouse + tampilkan UI skip
 * @author Custom
 *
 * @help
 * Tekan Enter, Escape, atau klik tombol Skip untuk skip video.
 */

(function () {
    "use strict";

    var _skipButton = null;

    function createSkipButton() {
        if (_skipButton) return;

        _skipButton = document.createElement('div');
        _skipButton.id = 'skip-video-btn';
        _skipButton.innerText = '▶▶ Skip Video';
        _skipButton.style.cssText = [
            'position: fixed',
            'bottom: 40px',
            'right: 40px',
            'padding: 10px 22px',
            'background: rgba(0,0,0,0.6)',
            'color: white',
            'font-size: 18px',
            'font-family: sans-serif',
            'border: 2px solid rgba(255,255,255,0.7)',
            'border-radius: 8px',
            'cursor: pointer',
            'z-index: 99999',
            'user-select: none',
            'transition: background 0.2s',
        ].join(';');

        _skipButton.onmouseover = function () {
            _skipButton.style.background = 'rgba(255,255,255,0.25)';
        };
        _skipButton.onmouseout = function () {
            _skipButton.style.background = 'rgba(0,0,0,0.6)';
        };
        _skipButton.onclick = function () {
            skipVideo();
        };

        document.body.appendChild(_skipButton);
    }

    function removeSkipButton() {
        if (_skipButton) {
            document.body.removeChild(_skipButton);
            _skipButton = null;
        }
    }

    function skipVideo() {
        var video = Graphics._video;
        if (video) {
            video.pause();
            video.currentTime = video.duration || 0;
            var event = document.createEvent('Event');
            event.initEvent('ended', true, true);
            video.dispatchEvent(event);
        }
        removeSkipButton();
    }

    var _SceneManager_updateScene = SceneManager.updateScene;
    SceneManager.updateScene = function () {
        _SceneManager_updateScene.call(this);

        if (Graphics.isVideoPlaying()) {
            createSkipButton();

            if (
                Input.isTriggered('ok') ||
                Input.isTriggered('cancel')
            ) {
                skipVideo();
            }
        } else {
            removeSkipButton();
        }
    };

})();