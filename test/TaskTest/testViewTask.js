const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function testViewTaskList() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        console.log("Bắt đầu kiểm thử: Xem danh sách Task");
        await driver.get('http://localhost:5173/tasks'); // URL trang danh sách tasks - **KIỂM TRA URL NÀY**
        console.log("Đã truy cập trang danh sách Task");

        // Chờ trang danh sách tasks tải xong (ví dụ, chờ tiêu đề trang hoặc một phần tử nào đó)
        console.log("Đang chờ trang danh sách Task tải xong...");
        await driver.wait(until.titleContains('Danh sách Task'), 5000); // Giả định tiêu đề trang - **KIỂM TRA TIÊU ĐỀ TRANG THỰC TẾ**
        console.log("Trang danh sách Task đã tải xong");

        // Kiểm tra xem có task nào trong danh sách không (kiểm tra số lượng hoặc sự tồn tại của một task cụ thể)
        console.log("Đang tìm các Task item trong danh sách...");
        const taskList = await driver.findElements(By.className('task-item')); // Giả định mỗi task trong danh sách có class 'task-item' - **KIỂM TRA CLASS NAME NÀY TRONG HTML**
        assert.ok(taskList.length > 0, 'Kiểm định thất bại: Không tìm thấy task nào trong danh sách Task.');
        console.log(`Kiểm định thành công: Tìm thấy ${taskList.length} task trong danh sách.`);
        console.log('Kiểm thử xem danh sách Task thành công');

        // [Tùy chọn] Kiểm tra chi tiết của một task trong danh sách (nếu cần)
        // Ví dụ: Click vào task đầu tiên và kiểm tra nội dung chi tiết

    } catch (error) {
        console.error('Lỗi trong quá trình kiểm thử xem danh sách Task:', error);
        console.error('Kiểm thử xem danh sách Task thất bại');
        throw error;
    } finally {
        await driver.quit();
        console.log('Đã đóng trình duyệt.');
    }
}

testViewTaskList();