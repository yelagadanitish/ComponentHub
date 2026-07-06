const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");

// Folder containing all component images
const folderPath = path.join(__dirname, "Component Images");

// Backend API
const API_URL = "http://localhost:5000/api/image";

let uploaded = 0;
let failed = 0;
const failedImages = [];

async function uploadImage(filePath, current, total) {

    const componentName = path.parse(filePath).name;

    const form = new FormData();

    form.append("componentName", componentName);

    form.append(
        "image",
        fs.createReadStream(filePath)
    );

    try {

        await axios.post(

            API_URL,

            form,

            {
                headers: form.getHeaders()
            }

        );

        uploaded++;

        console.log(
            `[${current}/${total}] ✅ ${componentName}`
        );

    }

    catch (error) {

    failed++;

    failedImages.push(componentName);

    console.log(
        `[${current}/${total}] ❌ ${componentName}`
    );

    console.log("\n========== ERROR ==========");

    if (error.response) {

        console.log("Status :", error.response.status);

        console.log("Response :", error.response.data);

    }

    console.log("Message :", error.message);

    console.log("===========================\n");

}
}

async function start() {

    if (!fs.existsSync(folderPath)) {

        console.log(
            "❌ Component Images folder not found."
        );

        return;

    }

    const files = fs.readdirSync(folderPath)

        .filter(file => {

            const ext =
                path.extname(file).toLowerCase();

            return [

                ".jpg",

                ".jpeg",

                ".png"

            ].includes(ext);

        });

    const total = files.length;

    console.log("\n==============================");
    console.log(`Found ${total} Images`);
    console.log("==============================\n");

    let count = 1;

    for (const file of files) {

        await uploadImage(

            path.join(folderPath, file),

            count,

            total

        );

        count++;

    }

    console.log("\n=======================================");
    console.log("Upload Finished");
    console.log("=======================================");
    console.log(`✅ Uploaded : ${uploaded}`);
    console.log(`❌ Failed   : ${failed}`);

    if (failedImages.length > 0) {

        console.log("\nFailed Images:");

        failedImages.forEach(img =>

            console.log(" -", img)

        );

    }

    console.log("=======================================\n");

}

start();


