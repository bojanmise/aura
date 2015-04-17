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
package org.auraframework.def;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.auraframework.throwable.quickfix.DefinitionNotFoundException;
import org.auraframework.throwable.quickfix.QuickFixException;

/**
 * Common base for ComponentDef and ApplicationDef
 */
public interface BaseComponentDef extends RootDefinition {

    @Override
    DefDescriptor<? extends BaseComponentDef> getDescriptor();

    boolean isExtensible();

    boolean isAbstract();

    boolean isTemplate();

    /**
     * Get the set of dependencies declared on this component.
     * 
     * These dependencies must be loaded for the component to be functional, either at the initial load time or before
     * rendering. These dependencies are in the form of DescriptorFilters which can then be used to match the actual
     * descriptors.
     * 
     * @return the list of declared dependencies for the component.
     */
    List<DependencyDef> getDependencies();

    /**
     * Get the event handlers for the component.
     * 
     * @return all the handlers on this component, including those inherited
     * @throws QuickFixException
     */
    Collection<EventHandlerDef> getHandlerDefs() throws QuickFixException;

    /**
     * Get the library import statements for the component.
     * 
     * @return all library requirements on this component, including those inherited
     * @throws QuickFixException
     */
    Collection<ImportDef> getImportDefs() throws QuickFixException;

    DefDescriptor<ModelDef> getLocalModelDefDescriptor();

    List<DefDescriptor<ModelDef>> getModelDefDescriptors()
            throws QuickFixException;

    List<DefDescriptor<ControllerDef>> getControllerDefDescriptors()
            throws QuickFixException;

    ModelDef getModelDef() throws QuickFixException;

    ControllerDef getControllerDef() throws QuickFixException;
    ControllerDef getDeclaredControllerDef() throws QuickFixException;

    DefDescriptor<? extends BaseComponentDef> getExtendsDescriptor();

    DefDescriptor<RendererDef> getRendererDescriptor() throws QuickFixException;

    DefDescriptor<StyleDef> getStyleDescriptor();

    StyleDef getStyleDef() throws QuickFixException;

    List<AttributeDefRef> getFacets();

    Map<DefDescriptor<MethodDef>, MethodDef> getMethodDefs() throws QuickFixException;

    RendererDef getLocalRendererDef() throws QuickFixException;

    boolean isLocallyRenderable() throws QuickFixException;

    ComponentDef getTemplateDef() throws QuickFixException;

    DefDescriptor<DesignDef> getDesignDefDescriptor();

    DefDescriptor<SVGDef> getSVGDefDescriptor();

    DefDescriptor<ComponentDef> getTemplateDefDescriptor();

    public List<ClientLibraryDef> getClientLibraries();

    public static enum RenderType {
        SERVER, CLIENT, AUTO
    };

    RenderType getRender();

    HelperDef getHelperDef() throws QuickFixException;

    Set<DefDescriptor<InterfaceDef>> getInterfaces();

    boolean hasLocalDependencies() throws QuickFixException;

    public static enum WhitespaceBehavior {
        /**
         * < keep or eliminate insignificant whitespace as the framework determines is best
         */
        OPTIMIZE,
        /** < treat all whitespace as significant, hence preserving it */
        PRESERVE
    };

    public static final WhitespaceBehavior DefaultWhitespaceBehavior = WhitespaceBehavior.OPTIMIZE;

    WhitespaceBehavior getWhitespaceBehavior();

    DefDescriptor<? extends BaseComponentDef> getDefaultExtendsDescriptor();

    /**
     * Adds specified client libraries to definition
     * 
     * @param clientLibs list of client libraries
     */
    void addClientLibs(List<ClientLibraryDef> clientLibs);

    Set<ResourceDef> getResourceDefs() throws QuickFixException;

    /**
     * Gets the {@link ThemeDef} that's part of the component (or app) bundle.
     */
    DefDescriptor<ThemeDef> getCmpTheme();

    /**
     * Returns true if this component has a child component def ref html element that has aura:flavorable.
     *
     * @see FlavoredStyleDef
     */
    boolean hasFlavorableChild();

    /**
     * Returns the default flavor name.
     *
     * @see FlavoredStyleDef
     *
     * @return The default flavor, or null if none specified.
     */
    String getDefaultFlavor();

    /**
     * The same as {@link #getDefaultFlavor()}, except if an explicit defaultFlavor is not specified, and a
     * {@link FlavoredStyleDef} exists in the bundle with a flavor named "default", then "default" will be returned.
     * <p>
     * WARNING: This method may potentially load a {@link FlavoredStyleDef}. Do not call in places where loading a definition
     * may be inappropriate (e.g., in a validateDefinition impl).
     *
     * @return The default flavor if specified, or the implicit default flavor "default" if defined, or null if neither
     *         apply.
     * @throws QuickFixException If there is a problem loading the flavor def.
     */
    String getDefaultFlavorOrImplicit() throws QuickFixException;
    
    /**
     * Get the generated JavaScript class for this component.
     * This class includes setting up its inheritance, its render methods and its helper methods. 
     * The rest of the definition of the class comes back as meta data in a JSON object. 
     * Which further configures the generated JavaScript class.
     * If not provided, will use the base Component() constructor, but won't have a valid helper, so this is pretty much required now.
     *
     * @throws QuickFixException
     * @throws IOException
     */
    String getComponentClass() throws QuickFixException, IOException;
}
