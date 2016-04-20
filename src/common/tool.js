export const updated_props = (props_config, curr_props, next_props) => {
    return Object.keys(props_config).reduce((prev, key) => {
        if (next_props[key] !== undefined && !props_config[key](curr_props[key], next_props[key])) {
            prev[key] = next_props[key];
        }

        return prev;
    }, {});
}

