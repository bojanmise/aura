({
    selector: {
        literal: '.m-literal span',
        changeValuesBtn: '#change-values'
    },

    testFalsy: {
        browsers: ['GOOGLECHROME'],
        test: [
            function(cmp) {
                var expected = 'false';
                var element = cmp
                    .getElement()
                    .querySelector(this.selector.literal);
                return new Promise(function(resolve, reject) {
                    var actual = element.textContent;
                    $A.test.assertEquals(actual, expected, 'Wrong literal');
                    resolve();
                });
            }
        ]
    },

    testAttributesAreReflectedOnInteropComponent: {
        browsers: ['GOOGLECHROME'],
        test: [
            function defaultProps(cmp) {
                var list = cmp.find('list');

                $A.test.assertEquals(
                    list.get('v.items').length,
                    0,
                    'Wrong number of items on InteropComponent'
                );
                $A.test.assertEquals(
                    list.getElement().items.length,
                    0,
                    'Wrong number of items on Element'
                );
            },
            function updateProps(cmp) {
                var list = cmp.find('list');

                cmp.set('v.items', [{ label: 'item1' }, { label: 'item2' }]);

                $A.test.assertEquals(
                    list.get('v.items').length,
                    2,
                    'Wrong number of items on InteropComponent'
                );
                $A.test.assertEquals(
                    list.getElement().items.length,
                    2,
                    'Wrong number of items on Element'
                );
            },
            function renderUpdatedProps(cmp) {
                var itemElement = cmp
                    .find('list')
                    .getElement()
                    .querySelectorAll('li');

                $A.test.assertEquals(
                    itemElement.length,
                    2,
                    'Wrong number of items has been rendered'
                );
            }
        ]
    },

    testDoesntReturnDefaultFromInteropComponent: {
        browsers: ['GOOGLECHROME'],
        test: [
            function defaultProps(cmp) {
                var list = cmp.find('list-without-items');

                // The default value held by the InteropComponent element shouldn't be retrievable using the cmp.get
                $A.test.assertEquals(
                    list.get('v.items'),
                    undefined,
                    'Wrong number of items on InteropComponent'
                );
                $A.test.assertEquals(
                    list.getElement().items.length,
                    0,
                    'Wrong number of items on Element'
                );
            }
        ]
    },

    testUpdateAttributeWhenNotBoundInTheTemplate: {
        browsers: ['GOOGLECHROME'],
        test: [
            function updateProps(cmp) {
                var list = cmp.find('list-without-items');

                list.set('v.items', [{ label: 'item1' }, { label: 'item2' }]);

                $A.test.assertEquals(
                    list.get('v.items').length,
                    2,
                    'Wrong number of items on InteropComponent'
                );
                $A.test.assertEquals(
                    list.getElement().items.length,
                    2,
                    'Wrong number of items on Element'
                );
            },
            function renderUpdatedProps(cmp) {
                var itemElement = cmp
                    .find('list-without-items')
                    .getElement()
                    .querySelectorAll('li');

                $A.test.assertEquals(
                    itemElement.length,
                    2,
                    'Wrong number of items has been rendered'
                );
            }
        ]
    },
    testCanReadPublicAccessors: {
        browsers: ['GOOGLECHROME'],
        test: [
            function (cmp) {
                var interopCmp = cmp.find('main');

                $A.test.assertEquals('accessor-test-value', interopCmp.get('v.myAccessor'), 'should be able to read public accessor');
            }
        ]
    },
    testCanReadUpdatedAccessorValue: {
        browsers: ['GOOGLECHROME'],
        test: [
            function (cmp) {
                var interopCmp = cmp.find('main');
                interopCmp.getElement().querySelector(this.selector.changeValuesBtn).click();

                $A.test.assertEquals('modified-accessor-value', interopCmp.get('v.myAccessor'), 'should be able to read accessor modified value');
            }
        ]
    },
    testCantSetAccessorPropertyViaSet: {
        browsers: ['GOOGLECHROME'],
        test: [
            function (cmp) {
                var hasError = false;
                var interopCmp = cmp.find('main');
                var expectedMessage = "Assertion Failed!: Attribute 'myAccessor' is getter only and can't be initialized from owner : false";
                var actualMessage = '';
                try {
                    interopCmp.set('v.myAccessor', 'some value');
                } catch (e) {
                    actualMessage = e.message;
                    hasError = true;
                }

                $A.test.assertEquals(true, hasError, 'it should not be able to set a public accessor via template');
                $A.test.assertEquals(expectedMessage, actualMessage, 'it should display a correct error message when trying to set an accessor');
            }
        ]
    },
    testCanPassPRV: {
        browsers: ['GOOGLECHROME'],
        test: [
            function (cmp) {
                $A.test.assertEquals('accessor-test-value', cmp.get('v.accessorValue'), 'accessor value should be reflected on the PRV.');

                var interopCmp = cmp.find('main');
                interopCmp.getElement().querySelector(this.selector.changeValuesBtn).click();

                $A.test.assertEquals('modified-accessor-value', cmp.get('v.accessorValue'), 'should be able to read accessor modified value from the bound template');
            }
        ]
    },
    testAccessorIgnoresPassedPrimitiveValue: {
        browsers: ['GOOGLECHROME'],
        test: [
            function (cmp) {
                var interopCmp = cmp.find('accessor-primitive-value');
                $A.test.assertEquals('accessor-test-value', interopCmp.get('v.myAccessor'), 'accessor should ignore passed primitive value.');

                var interopCmp = cmp.find('accessor-primitive-value');
                interopCmp.getElement().querySelector(this.selector.changeValuesBtn).click();

                $A.test.assertEquals('modified-accessor-value', interopCmp.get('v.myAccessor'), 'should be able to read accessor modified value');
            }
        ]
    }
})