function readPackage(pkg) {
    if (pkg.name === "@frontify/fondue") {
        pkg.dependencies = {
            ...pkg.dependencies,
            scheduler: ">=0.19.0",
        };
    } else if (
        pkg.name === "@frontify/sidebar-settings" ||
        pkg.name === "@frontify/guideline-blocks-settings"
    ) {
        pkg.dependencies = {
            ...pkg.dependencies,
            "@frontify/fondue": "^12.0.0-beta.166",
        };
    }

    return pkg;
}

module.exports = {
    hooks: {
        readPackage,
    },
};
