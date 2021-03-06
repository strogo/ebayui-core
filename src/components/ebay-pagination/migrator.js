const { createIconFromAttribute, setAttributeIfPresent } = require('../../common/migrators');

// Transforms an `icon` attribute into an `<ebay-menu:_icon>` tag
function migratorMarko4(el, context) {
    createIconFromAttribute(el, context, 'icon');
    setAttributeIfPresent(el, context, 'on-pagination-next', 'on-next');
    setAttributeIfPresent(el, context, 'on-pagination-previous', 'on-previous');
    setAttributeIfPresent(el, context, 'on-pagination-select', 'on-select');
}

function migratorMarko5() {
    return;
}

module.exports = function migrator(a, b) {
    if (a.hub) {
        return migratorMarko5(a, b);
    }

    return migratorMarko4(a, b);
};
