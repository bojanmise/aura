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
package org.auraframework.instance;

import org.auraframework.def.RendererDef;
import org.auraframework.system.RenderContext;
import org.auraframework.throwable.quickfix.QuickFixException;

import java.io.IOException;

/**
 * Instance of a Renderer
 */
public interface RendererInstance extends Instance<RendererDef> {
    /**
     * Render a component.
     *
     * @param component  The instance to render.
     * @param rc the rendering context
     * @throws IOException       if something cannot be written
     * @throws QuickFixException if there is a quick fix.
     */
    void render(BaseComponent<?, ?> component, RenderContext rc) throws IOException, QuickFixException;
}