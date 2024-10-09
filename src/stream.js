const fs = require('fs');
const path = require('path');
const stream = require('stream');

let index = 0;

// Readable stream to read data
const readable = new stream.Readable({
    highWaterMark: 2, // 设置缓存数据
    read() {
        // 模拟数据写到流中
        process.nextTick(() => {
            if (index < 10) {
                // 将数据推到流中
                this.push(`Data ${++index}\n`);
            } else {
                // 超过就停止
                this.push(null);
            }
        });
    }
});

// 创建一个写流
// const writable = fs.createWriteStream(path.join(__dirname, 'output.txt'), {
//     highWaterMark: 2 // Set buffer size for writing
// });

const writable = new stream.Writable({
    highWaterMark: 2,
    write: function (chunk, encoding, next) {
        console.log('写入:', chunk.toString())
    }
})


// 写入管道
readable.pipe(writable);

// 处理管道流中一些事物
readable.on('data', (chunk) => {
    console.log('Reading chunk:', chunk.toString());
});

writable.on('finish', () => {
    console.log('Writing completed and the file has been saved to output.txt');
});

writable.on('error', (err) => {
    console.error('Error during writing:', err);
});

readable.on('end', () => {
    console.log('Reading finished.');
});