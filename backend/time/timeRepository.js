const fs = require('fs').promises;
const parse = require('csv-parse/lib/sync');

const filePath = './data/times.csv';
// async function test() {
//     const fileContent = await fs.readFile(filePath);
//     const data = parse(fileContent, {columns: true});
//     console.log(data);
// }

// test();
class TimeRepository {
    async getTimes() {
        const fileContent = await fs.readFile(filePath);
        const data = parse(fileContent, {columns: true});
        return data;
    } 

    // async getTimeById(id) {
    //     const fileContent = await fs.readFile(filePath);
    //     const data = parse(fileContent, {columns: true});
    //     let time;
    //     data.forEach(element => {
    //         if(element.id === id) {
    //             time = element;
    //         }
    //     });
    //     return time;
    // }
}

module.exports = TimeRepository;