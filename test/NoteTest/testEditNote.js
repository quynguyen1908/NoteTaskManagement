const { Builder, By, Key, until } = require('selenium-webdriver');

async function testEditNote() {
    // Khởi tạo trình duyệt Chrome
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Mở trang danh sách ghi chú
        await driver.get('http://localhost:5173/notes');

        // Chờ cho đến khi các ghi chú xuất hiện
        await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Test Note Title')]")), 5000);

        // Tìm kiếm và nhấn vào ghi chú cần chỉnh sửa
        let noteLink = await driver.findElement(By.xpath("//div[contains(text(), 'Test Note Title')]"));
        await noteLink.click();

        // Chờ cho đến khi điều hướng đến trang chi tiết ghi chú
        await driver.wait(until.urlContains('/notes/'), 5000);

        // Chờ cho đến khi chi tiết ghi chú xuất hiện
        await driver.wait(until.elementLocated(By.id('title')), 5000);
        await driver.wait(until.elementLocated(By.id('content')), 5000);

        // Tìm kiếm phần tử input cho tiêu đề và chỉnh sửa tiêu đề
        let titleField = await driver.findElement(By.id('title'));
        await titleField.clear();
        await titleField.sendKeys('Updated Test Note Title');

        // Tìm kiếm phần tử textarea cho nội dung và chỉnh sửa nội dung
        let contentField = await driver.findElement(By.id('content'));
        await contentField.clear();
        await contentField.sendKeys('This is the updated content of the test note.');
        
        // Tìm kiếm phần tử select cho trạng thái và thay đổi trạng thái
        let statusSelect = await driver.findElement(By.id('status'));
        let currentStatus = await statusSelect.getAttribute('value');
        let newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
        await statusSelect.sendKeys(newStatus);

        // Tìm kiếm nút Save và nhấn vào nút
        let saveButton = await driver.findElement(By.id('btn-save'));
        await saveButton.click();

        // Chờ cho đến khi điều hướng đến trang danh sách ghi chú
        await driver.wait(until.urlContains('/notes'), 5000);

        // Chờ đợi phần tử chứa tiêu đề ghi chú mới xuất hiện
        await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Updated Test Note Title')]")), 5000);

        // Kiểm tra xem ghi chú đã được chỉnh sửa thành công hay chưa
        let noteTitle = await driver.findElement(By.xpath("//div[contains(text(), 'Updated Test Note Title')]")).getText();
        if (noteTitle === 'Updated Test Note Title') {
            console.log('Edit note test passed');
        } else {
            console.log('Edit note test failed');
        }
    } catch (error) {
        console.error('Error during test:', error);
    } finally {
        // Đóng trình duyệt
        await driver.quit();
    }
}

testEditNote();