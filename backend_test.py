#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime
import uuid

class EcoluteMarketingAPITester:
    def __init__(self, base_url="https://cursor-char-motion.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                response = requests.request(method, url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)}")
                except:
                    print(f"   Response: {response.text}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text}")

            self.test_results.append({
                'name': name,
                'method': method,
                'endpoint': endpoint,
                'expected_status': expected_status,
                'actual_status': response.status_code,
                'success': success,
                'response_time': response.elapsed.total_seconds(),
                'response_data': response.text
            })

            return success, response.json() if success and response.content else {}

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            self.test_results.append({
                'name': name,
                'method': method,
                'endpoint': endpoint,
                'expected_status': expected_status,
                'actual_status': 'ERROR',
                'success': False,
                'error': str(e)
            })
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                'name': name,
                'method': method,
                'endpoint': endpoint,
                'expected_status': expected_status,
                'actual_status': 'ERROR',
                'success': False,
                'error': str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "/",
            200
        )
        return success

    def test_status_endpoints(self):
        """Test status check creation and retrieval"""
        # Test creating a status check
        test_client_name = f"test_client_{uuid.uuid4().hex[:8]}"
        success, response = self.run_test(
            "Create Status Check",
            "POST",
            "/status",
            200,
            data={"client_name": test_client_name}
        )
        
        if not success:
            return False
        
        # Test getting status checks
        success, response = self.run_test(
            "Get Status Checks",
            "GET",
            "/status",
            200
        )
        
        return success

    def test_contact_form_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "John Doe",
            "email": "john.doe@test.com",
            "company": "Test Company",
            "service": "SEO Optimization",
            "message": "This is a test message for the contact form."
        }
        
        success, response = self.run_test(
            "Submit Contact Form",
            "POST",
            "/contact",
            200,
            data=test_data
        )
        
        if success and response.get('success'):
            print(f"✅ Contact form submitted successfully with ID: {response.get('id')}")
        
        return success

    def test_get_contact_submissions(self):
        """Test getting contact submissions"""
        success, response = self.run_test(
            "Get Contact Submissions",
            "GET",
            "/contacts",
            200
        )
        
        if success:
            print(f"✅ Retrieved {len(response) if isinstance(response, list) else 0} contact submissions")
        
        return success

    def test_error_cases(self):
        """Test various error scenarios"""
        print(f"\n🔍 Testing Error Cases...")
        
        # Test invalid contact form data
        success, response = self.run_test(
            "Invalid Contact Form (missing required fields)",
            "POST",
            "/contact",
            422,  # FastAPI validation error
            data={"name": "John"}  # Missing required email and message
        )
        
        # Test nonexistent endpoint
        success, response = self.run_test(
            "Nonexistent Endpoint",
            "GET",
            "/nonexistent",
            404
        )
        
        return True

def main():
    print("🚀 Starting Evolute Marketing API Tests...")
    print("="*60)
    
    # Initialize tester
    tester = EcoluteMarketingAPITester()
    
    # Run tests
    tests = [
        ("Root Endpoint", tester.test_root_endpoint),
        ("Status Endpoints", tester.test_status_endpoints),
        ("Contact Form Submission", tester.test_contact_form_submission),
        ("Get Contact Submissions", tester.test_get_contact_submissions),
        ("Error Cases", tester.test_error_cases),
    ]
    
    for test_name, test_func in tests:
        print(f"\n{'='*20} {test_name} {'='*20}")
        try:
            test_func()
        except Exception as e:
            print(f"❌ Test {test_name} failed with exception: {str(e)}")
    
    # Print final results
    print(f"\n{'='*60}")
    print(f"📊 TEST SUMMARY")
    print(f"{'='*60}")
    print(f"Tests run: {tester.tests_run}")
    print(f"Tests passed: {tester.tests_passed}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%" if tester.tests_run > 0 else "No tests run")
    
    # Print individual results
    print(f"\n📋 DETAILED RESULTS:")
    for i, result in enumerate(tester.test_results, 1):
        status_icon = "✅" if result['success'] else "❌"
        print(f"{status_icon} {i}. {result['name']}: {result.get('actual_status', 'ERROR')}")
        if not result['success'] and 'error' in result:
            print(f"    Error: {result['error']}")
    
    # Return exit code
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())