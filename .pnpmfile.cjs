function readPackage(pkg) {
    if (
        pkg.name === "@frontify/sidebar-settings" ||
        pkg.name === "@frontify/guideline-blocks-settings"
    ) {
        pkg.dependencies = {
            ...pkg.dependencies,
            "@frontify/fondue": "12.0.0-beta.400",
        };
    }

    return pkg;
}

module.exports = {
    hooks: {
        readPackage,
    },
};
