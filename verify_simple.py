from playwright.sync_api import sync_playwright

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://127.0.0.1:5173", timeout=60000)
        page.wait_for_timeout(10000)
        page.screenshot(path="/home/jules/verification/final_home.png")
        browser.close()

if __name__ == "__main__":
    verify_frontend()
