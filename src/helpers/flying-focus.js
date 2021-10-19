const FlyingFocus = (function () {
    let staticCounter;
    let flyingFocus;

    let hidden = true;
    let keydownTime = 0;
    let prevFocused,
        prevOffset = {};

    let focusTimeout;
    let hideTimeout;
    let positionTimeout;

    const CSS_ID = 'flying-focus';
    const CSS_CLASS_ACTIVE = 'flying-focus--visible';
    const DURATION = 150;

    function getBounds(elem) {
        const rect = elem.getBoundingClientRect();
        const docElem = document.documentElement;
        const win = document.defaultView;
        const body = document.body;

        let clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
            scrollTop = win.pageYOffset || docElem.scrollTop || body.scrollTop,
            scrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft,
            top = rect.top + scrollTop - clientTop,
            left = rect.left + scrollLeft - clientLeft;

        return {
            top,
            left,
            width: rect.width,
            height: rect.height,
            bottom: top + rect.height,
            right: left + rect.width
        };
    }

    function getInputBounds(element) {
        let elements = [element];

        const id = element.getAttribute('id');
        const labels = Array.prototype.slice.call(document.querySelectorAll(`label[for="${id}"]:not(.visuallyhidden)`));

        // merge arrays
        elements = elements.concat(labels);

        const bounds = {
            top: 1000000,
            left: 1000000,
            bottom: -10000,
            right: -10000
        };

        for (var i = 0, len = elements.length; i < len; i++) {
            const elemBounds = getBounds(elements[i]);

            bounds.top = Math.min(bounds.top, elemBounds.top);
            bounds.left = Math.min(bounds.left, elemBounds.left);
            bounds.bottom = Math.max(bounds.bottom, elemBounds.bottom);
            bounds.right = Math.max(bounds.right, elemBounds.right);
        }

        bounds.width = bounds.right - bounds.left;
        bounds.height = bounds.bottom - bounds.top;

        return bounds;
    }

    function addEvent(elem, event, handler) {
        elem.addEventListener(event, handler, true);
    }

    function hide() {
        if (!hidden) {
            // console.log('Hide focus');
            clearTimeout(focusTimeout);
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(hideReally, 10);
        }
    }

    function hideReally() {
        flyingFocus.classList.remove(CSS_CLASS_ACTIVE);

        hidden = true;

        clearTimeout(positionTimeout);
    }

    function show() {
        clearTimeout(hideTimeout);
        clearTimeout(positionTimeout);
        const duration = hidden ? 0 : DURATION / 1000;
        flyingFocus.style.transitionDuration = flyingFocus.style.WebkitTransitionDuration = duration + 's';

        staticCounter = 0;
        positionTimeout = setTimeout(checkPosition, 100);

        if (hidden) {
            flyingFocus.classList.add(CSS_CLASS_ACTIVE);

            hidden = false;
        }
    }

    // sometimes when we focus an element, this will trigger some kind of
    // layout change or event animation. we'll check a few times to make sure
    // size and position will stay the same (after that we stop)
    function checkPosition() {
        const offset = reposition(prevFocused);
        if (offset.top !== prevOffset.top || offset.left !== prevOffset.left || offset.width !== prevOffset.width || offset.height !== prevOffset.height) {
            // console.log("Changed focus position", offset, prevFocused);
            prevOffset = offset;
            staticCounter = 0;
        } else {
            staticCounter++;
        }
        if (staticCounter < 3) {
            // at the beginning and as long as we see position changes
            // we will check the position/bounds more often
            positionTimeout = setTimeout(checkPosition, 100);
        } else {
            // we want to measure at least every 2 seconds
            positionTimeout = setTimeout(checkPosition, 1000);
        }
    }

    function reposition(target) {
        if (hidden) {
            return;
        }

        const offset = getInputBounds(target);

        if (offset.top !== prevOffset.top || offset.left !== prevOffset.left || offset.width !== prevOffset.width || offset.height !== prevOffset.height) {
            flyingFocus.style.left = offset.left + 'px';
            flyingFocus.style.top = offset.top + 'px';
            flyingFocus.style.width = offset.width + 'px';
            flyingFocus.style.height = offset.height + 'px';
        }

        return offset;
    }

    function init(element) {
        const existingElement = document.getElementById(CSS_ID);
        if (existingElement && existingElement.classList.contains('is-initialized')) {
            return;
        }

        if (element) {
            flyingFocus = element;
        } else if (document && document.getElementById(CSS_ID)) {
            flyingFocus = document.getElementById(CSS_ID);
        } else {
            flyingFocus = document.createElement('div');

            document.body.appendChild(flyingFocus);
        }

        flyingFocus.id = CSS_ID;

        addEvent(
            document.documentElement,
            'keydown',
            (event) => {
                if (event.keyCode < 65) {
                    keydownTime = new Date();
                }
            },
            true
        );

        addEvent(document, 'focusin', (event) => {
            // console.log('Has Focus', event.target);
            focusTimeout = setTimeout(() => {
                const target = event.target;
                if (target.id === CSS_ID) {
                    return;
                }

                const focusTime = new Date();

                if (hidden && focusTime - keydownTime > 100) {
                    // the focus was not done with a key
                    // console.log("Won't focus because key down too long ago", focusTime - keydownTime);
                    return;
                }

                // console.log('Show Focus', event.target);
                show();

                prevOffset = reposition(target);

                prevFocused = target;
            }, 1);
        });

        addEvent(document, 'focusout', (e) => hide());

        addEvent(document.documentElement, 'mousedown', (event) => {
            if (event.detail) {
                hideReally();
            }
        });

        addEvent(document.documentElement, 'touchstart', (event) => {
            if (event.detail) {
                hideReally();
            }
        });

        addEvent(window, 'resize', () => reposition(prevFocused));

        flyingFocus.classList.add('is-initialized');
    }

    return {
        init
    };
})();

export { FlyingFocus };
