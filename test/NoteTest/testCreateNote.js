const { Builder, By, Key, until } = require('selenium-webdriver');

async function testCreateNote() {
    // Khởi tạo trình duyệt Chrome
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Mở trang tạo ghi chú
        await driver.get('http://localhost:5173/create-note');

        // Tìm kiếm phần tử input cho tiêu đề và nhập tiêu đề
        let titleField = await driver.findElement(By.id('title'));
        await titleField.sendKeys('Test Note Title');

        // Tìm kiếm phần tử textarea cho nội dung và nhập nội dung
        let contentField = await driver.findElement(By.id('content'));
        await contentField.sendKeys('This is the content of the test note.');

        // Tìm kiếm nút Save và nhấn vào nút
        let saveButton = await driver.findElement(By.css('button[type="submit"]'));
        await saveButton.click();

        // Chờ cho đến khi điều hướng đến trang danh sách ghi chú
        await driver.wait(until.urlContains('/notes'), 5000);

        // Chờ đợi phần tử chứa tiêu đề ghi chú mới xuất hiện
        await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Test Note Title')]")), 5000);

        // Kiểm tra xem ghi chú mới đã được tạo thành công hay chưa
        let noteTitle = await driver.findElement(By.xpath("//div[contains(text(), 'Test Note Title')]")).getText();
        if (noteTitle === 'Test Note Title') {
            console.log('Create note test passed');
        } else {
            console.log('Create note test failed');
        }
    } catch (error) {
        console.error('Error during test:', error);
    } finally {
        // Đóng trình duyệt
        await driver.quit();
    }
}

testCreateNote();