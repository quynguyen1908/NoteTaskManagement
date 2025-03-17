const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function testCreateTask() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        console.log("Bắt đầu kiểm thử: Tạo Task mới");
        await driver.get('http://localhost:5173/create-task'); // Giả định URL trang tạo task

        // Điền thông tin Task
        await driver.findElement(By.id('title')).sendKeys('Task Kiểm Thử Tiêu Đề'); // Giả định ID cho input tiêu đề
        await driver.findElement(By.id('description')).sendKeys('Đây là mô tả của task kiểm thử.'); // Giả định ID cho textarea mô tả
        await driver.findElement(By.id('place')).sendKeys('Địa điểm kiểm thử'); // Giả định ID cho input địa điểm
        await driver.findElement(By.css('input[placeholder="Begin Date"]') ).sendKeys('2024-03-17'); // Giả định ID cho input ngày bắt đầu
        await driver.findElement(By.css('input[placeholder="Begin Date"]') ).sendKeys('2024-03-18'); // Giả định ID cho input ngày kết thúc

        // Nhấn nút Lưu
        await driver.findElement(By.css('button[type="submit"]')).click(); // Giả định nút submit form

        // Chờ điều hướng đến trang danh sách tasks (hoặc trang chi tiết task vừa tạo)
        await driver.wait(until.urlContains('/tasks'), 5000); // Giả định URL trang danh sách task

        // Chờ hiển thị task vừa tạo trong danh sách (kiểm tra bằng tiêu đề)
        await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Task Kiểm Thử Tiêu Đề')]")), 5000); // Giả định task được hiển thị trong div chứa tiêu đề

        // Kiểm định: Xác minh task đã được tạo thành công
        const taskTitleElement = await driver.findElement(By.xpath("//div[contains(text(), 'Task Kiểm Thử Tiêu Đề')]"));
        const taskTitle = await taskTitleElement.getText();
        assert.strictEqual(taskTitle, 'Task Kiểm Thử Tiêu Đề', 'Kiểm định thất bại: Tiêu đề task trong danh sách không khớp với tiêu đề đã nhập.');
        console.log('Kiểm định thành công: Task đã được tạo và tiêu đề đã được xác minh.');
        console.log('Kiểm thử tạo Task thành công');

    } catch (error) {
        console.error('Lỗi trong quá trình kiểm thử tạo Task:', error);
        console.error('Kiểm thử tạo Task thất bại');
        throw error;
    } finally {
        await driver.quit();
        console.log('Đã đóng trình duyệt.');
    }
}

testCreateTask();