const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function testDeleteTask() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        console.log("Bắt đầu kiểm thử: Xóa Task");
        await driver.get('http://localhost:5173/tasks'); // URL trang danh sách tasks - **KIỂM TRA URL NÀY**
        console.log("Đã truy cập trang danh sách Task");

        // Giả định cần chọn task đầu tiên để xóa
        console.log("Đang tìm task đầu tiên trong danh sách...");
        const taskList = await driver.findElements(By.className('task-item')); // Giả định class 'task-item' - **KIỂM TRA CLASS NAME NÀY TRONG HTML**
        if (taskList.length === 0) {
            console.warn("Cảnh báo: Không có task nào để xóa. Hãy chắc chắn có task trước khi chạy kiểm thử này.");
            return; // Không tiếp tục nếu không có task nào
        }

        // Lấy tiêu đề của task đầu tiên trước khi xóa để kiểm tra sau
        console.log("Đang lấy tiêu đề task đầu tiên để kiểm tra sau khi xóa...");
        const taskTitleToDeleteElement = await driver.findElement(By.css('.task-item:first-child .task-title-element')); // Giả định CSS selector cho phần tử tiêu đề task - **KIỂM TRA CSS SELECTOR NÀY TRONG HTML**
        const taskTitleToDelete = await taskTitleToDeleteElement.getText();
        console.log(`Tiêu đề task cần xóa: '${taskTitleToDelete}'`);

        // Click vào nút "Xóa" của task đầu tiên
        console.log("Đang click nút Xóa của task đầu tiên...");
        const deleteButtonForFirstTask = await driver.findElement(By.css('.task-item:first-child .delete-button')); // Giả định CSS selector cho nút "Xóa" - **KIỂM TRA CSS SELECTOR NÀY TRONG HTML**
        await deleteButtonForFirstTask.click();
        console.log("Đã click nút Xóa");

        // [Tùy chọn] Chờ một xác nhận xóa (nếu có popup xác nhận trên UI)
        // Ví dụ: await driver.switchTo().alert().accept(); // Nếu dùng alert confirm

        // Chờ trang danh sách task được làm mới sau khi xóa
        console.log("Đang chờ trang danh sách Task được làm mới...");
        await driver.sleep(2000); // Chờ 2 giây - **CÓ THỂ CẦN ĐIỀU CHỈNH THỜI GIAN CHỜ NẾU CẦN**
        console.log("Trang danh sách Task đã được làm mới");

        // Kiểm tra xem task vừa xóa có còn hiển thị trong danh sách không (bằng cách tìm kiếm tiêu đề)
        console.log("Đang kiểm tra xem task đã xóa còn hiển thị trong danh sách không...");
        const deletedTaskElement = await driver.findElements(By.xpath(`//div[contains(text(), '${taskTitleToDelete}')]`)); // Tìm kiếm task theo tiêu đề - **KIỂM TRA XPATH NÀY và CÓ THỂ CẦN CHỈNH SỬA CHO PHÙ HỢP HTML**
        assert.strictEqual(deletedTaskElement.length, 0, 'Kiểm định thất bại: Task đã xóa vẫn hiển thị trong danh sách.');
        console.log('Kiểm định thành công: Task đã xóa không còn hiển thị trong danh sách.');
        console.log('Kiểm thử xóa Task thành công');


    } catch (error) {
        console.error('Lỗi trong quá trình kiểm thử xóa Task:', error);
        console.error('Kiểm thử xóa Task thất bại');
        throw error;
    } finally {
        await driver.quit();
        console.log('Đã đóng trình duyệt.');
    }
}

testDeleteTask();