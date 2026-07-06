const calculateAvailableKits = (

    kitComponents,

    inventory

) => {

    let available = Infinity;

    let limitingComponent = "";

    for (const item of kitComponents) {

        const component = inventory.find(

            row => row[0] === item.componentName

        );

        if (!component) {

            return {

                availableKits: 0,

                limitingComponent:

                    item.componentName,

                status: "OUT_OF_STOCK"

            };

        }

        const currentStock = Number(

            component[3]

        );

        const possible = Math.floor(

            currentStock /

            item.quantity

        );

        if (possible < available) {

            available = possible;

            limitingComponent =

                item.componentName;

        }

    }

    let status = "AVAILABLE";

    if (available === 0) {

        status = "OUT_OF_STOCK";

    }

    else if (available <= 5) {

        status = "LOW";

    }

    return {

        availableKits: available,

        limitingComponent,

        status

    };

};

module.exports = {

    calculateAvailableKits

};