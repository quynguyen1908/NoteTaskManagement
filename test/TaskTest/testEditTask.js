const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function testEditTask() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        console.log("Bắt đầu kiểm thử: Chỉnh sửa Task");
        await driver.get('http://localhost:5173/tasks'); // URL trang danh sách tasks - **KIỂM TRA URL NÀY**
        console.log("Đã truy cập trang danh sách Task");

        // Giả định cần chọn task đầu tiên để chỉnh sửa
        console.log("Đang tìm task đầu tiên trong danh sách...");
        const taskList = await driver.findElements(By.className('task-item')); // Giả định class 'task-item' - **KIỂM TRA CLASS NAME NÀY TRONG HTML**
        if (taskList.length === 0) {
            console.warn("Cảnh báo: Không có task nào để chỉnh sửa. Hãy chắc chắn có task trước khi chạy kiểm thử này.");
            return; // Không tiếp tục nếu không có task nào
        }

        // Click vào nút "Chỉnh sửa" của task đầu tiên
        console.log("Đang click nút Chỉnh sửa của task đầu tiên...");
        const editButtonForFirstTask = await driver.findElement(By.css('.task-item:first-child .edit-button')); // Giả định CSS selector cho nút "Chỉnh sửa" - **KIỂM TRA CSS SELECTOR NÀY TRONG HTML**
        await editButtonForFirstTask.click();
        console.log("Đã click nút Chỉnh sửa");

        // Chờ điều hướng đến trang chỉnh sửa task
        console.log("Đang chờ điều hướng đến trang chỉnh sửa Task...");
        await driver.wait(until.urlContains('/edit-task/'), 5000); // Giả định URL trang chỉnh sửa task - **KIỂM TRA URL NÀY**
        console.log("Đã điều hướng đến trang chỉnh sửa Task");

        // Thay đổi tiêu đề Task
        console.log("Đang tìm ô nhập tiêu đề và nhập tiêu đề mới...");
        const titleField = await driver.findElement(By.id('title')); // Giả định ID cho input tiêu đề trên trang CHỈNH SỬA - **KIỂM TRA ID NÀY TRONG HTML TRANG CHỈNH SỬA**
        await titleField.clear();
        await titleField.sendKeys('Task Đã Chỉnh Sửa Tiêu Đề');
        console.log("Đã nhập tiêu đề mới: 'Task Đã Chỉnh Sửa Tiêu Đề'");

        // Nhấn nút Lưu trên trang chỉnh sửa
        console.log("Đang click nút Lưu trên trang chỉnh sửa...");
        await driver.findElement(By.css('button[type="submit"]')).click(); // Giả định CSS selector nút submit form chỉnh sửa - **KIỂM TRA CSS SELECTOR NÀY TRONG HTML TRANG CHỈNH SỬA**
        console.log("Đã click nút Lưu trên trang chỉnh sửa");

        // Chờ điều hướng về trang danh sách tasks sau khi chỉnh sửa
        console.log("Đang chờ điều hướng về trang danh sách Task...");
        await driver.wait(until.urlContains('/tasks'), 5000); // Giả định URL trang danh sách task - **KIỂM TRA URL NÀY**
        console.log("Đã điều hướng về trang danh sách Task");

        // Chờ hiển thị tiêu đề task đã chỉnh sửa trong danh sách
        console.log("Đang chờ tiêu đề task đã chỉnh sửa xuất hiện trong danh sách...");
        await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Task Đã Chỉnh Sửa Tiêu Đề')]")), 5000); // XPath và tiêu đề - **KIỂM TRA XPATH NÀY và CÓ THỂ CẦN CHỈNH SỬA CHO PHÙ HỢP HTML**
        console.log("Đã tìm thấy tiêu đề task đã chỉnh sửa trong danh sách");

        // Kiểm định: Xác minh tiêu đề task đã được chỉnh sửa thành công
        console.log("Đang kiểm định tiêu đề task đã chỉnh sửa...");
        const updatedTaskTitleElement = await driver.findElement(By.xpath("//div[contains(text(), 'Task Đã Chỉnh Sửa Tiêu Đề')]")); // Lặp lại XPath - **ĐẢM BẢO XPATH NHẤT QUÁN VỚI PHẦN CHỜ ĐỢI**
        const updatedTaskTitle = await updatedTaskTitleElement.getText();
        assert.strictEqual(updatedTaskTitle, 'Task Đã Chỉnh Sửa Tiêu Đề', 'Kiểm định thất bại: Tiêu đề task đã chỉnh sửa trong danh sách không khớp.');
        console.log('Kiểm định thành công: Task đã được chỉnh sửa và tiêu đề đã được xác minh.');
        console.log('Kiểm thử chỉnh sửa Task thành công');


    } catch (error) {
        console.error('Lỗi trong quá trình kiểm thử chỉnh sửa Task:', error);
        console.error('Kiểm thử chỉnh sửa Task thất bại');
        throw error;
    } finally {
        await driver.quit();
        console.log('Đã đóng trình duyệt.');
    }
}

testEditTask();