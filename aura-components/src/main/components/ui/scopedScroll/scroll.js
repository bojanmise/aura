/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function lib() { //eslint-disable-line no-unused-vars
    var getSrollerWrapper = function (element) {
        var parent = element;
        while (parent && !parent._scopedScroll) {
            parent = parent.parentElement;
        }

        return parent;
    };

    var hasNonScopedScrollingWrapper = function (element) {
        var parent = element;
        while (parent && !parent._scopedScroll) {
            if (parent.scrollHeight !== parent.clientHeight) {
                return true;
            } else {
                parent = parent.parentElement;
            }
        }
        return false;
    };

    var mouseWheelHandler = function (e) {
        if (e.scopedScroll) {
            return;
        }

        var wrapper = e.currentTarget || getSrollerWrapper(e.target);

        if (!wrapper) {
            return;
        }

        var scrollTop    = wrapper.scrollTop;
        var scrollHeight = wrapper.scrollHeight;
        var height       = wrapper.offsetHeight;
        var delta        = e.wheelDelta;
        var up           = delta > 0;

        if (hasNonScopedScrollingWrapper(e.target)) {
            // ignore mousewheel event in these cases
            // this prevents preventDefault from being called and allows
            // elements with scrollbars (textarea, ckeditor etc) to scroll
            // @bug W-2961153@ @bug W-2960382@
        } else if (!up && (scrollHeight - height) === scrollTop) {
            // Scrolling down, but this will take us past the bottom.
            wrapper.scrollTop = scrollHeight;
            e.preventDefault();
        } else if (up && delta > scrollTop) {
            wrapper.scrollTop = 0;
            e.preventDefault();
        } else {
            e.scopedScroll = true;
        }
    };

    return {
        scope: function (element) {
            var dom = typeof element === 'string' ? document.querySelector(element) : element;
            if (dom && !dom._scopedScroll) {
                // mark scoped scroll for later so this
                // does not need to be recomputed
                dom.setAttribute && dom.setAttribute('data-scoped-scroll', true);
                dom.addEventListener && dom.addEventListener('mousewheel', mouseWheelHandler, false);
                dom._scopedScroll = true;
            }
        },
        unscope: function (element) {
            var dom = typeof element === 'string' ? document.querySelector(element) : element;
            if (dom) {
                dom.removeAttribute && dom.removeAttribute('data-scoped-scroll');
                dom.removeEventListener && dom.removeEventListener('mousewheel', mouseWheelHandler, false);
                dom._scopedScroll = false;
            }
        }
    };
}
