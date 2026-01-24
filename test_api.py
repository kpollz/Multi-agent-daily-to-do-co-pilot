#!/usr/bin/env python
"""
API Test Script - Quick testing of authentication endpoints
Usage: python test_api.py
"""

import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:8000"

def print_section(title):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}\n")

def print_response(response, title="Response"):
    print(f"{title}:")
    print(f"  Status Code: {response.status_code}")
    try:
        print(f"  Body: {json.dumps(response.json(), indent=2)}")
    except:
        print(f"  Body: {response.text}")
    print()

def test_health():
    """Test health check endpoint"""
    print_section("1. Health Check")
    response = requests.get(f"{BASE_URL}/api/health")
    print_response(response)
    return response.status_code == 200

def test_signup():
    """Test user signup"""
    print_section("2. User Signup")
    
    # Create unique user for testing
    timestamp = int(datetime.now().timestamp() * 1000)
    user_data = {
        "email": f"testuser{timestamp}@example.com",
        "username": f"testuser{timestamp}",
        "password": "testpassword123"
    }
    
    print(f"Creating user with data:")
    print(json.dumps(user_data, indent=2))
    print()
    
    response = requests.post(f"{BASE_URL}/api/auth/signup", json=user_data)
    print_response(response)
    
    if response.status_code == 200:
        return response.json(), user_data
    return None, user_data

def test_login(user_data):
    """Test user login"""
    print_section("3. User Login")
    
    login_data = {
        "username": user_data["username"],
        "password": user_data["password"]
    }
    
    print(f"Logging in with credentials:")
    print(json.dumps(login_data, indent=2))
    print()
    
    response = requests.post(f"{BASE_URL}/api/auth/login", json=login_data)
    print_response(response)
    
    if response.status_code == 200:
        token = response.json().get("access_token")
        return token
    return None

def test_get_current_user(username, password):
    """Test getting current user with Basic Auth"""
    print_section("4. Get Current User (with Basic Auth)")
    
    response = requests.get(
        f"{BASE_URL}/api/auth/me",
        auth=(username, password)
    )
    print_response(response)
    return response.status_code == 200

def test_logout():
    """Test logout"""
    print_section("5. Logout")
    
    response = requests.post(f"{BASE_URL}/api/auth/logout")
    print_response(response)
    return response.status_code == 200

def main():
    print("\n" + "="*60)
    print("  API Test Suite - Authentication Endpoints")
    print("="*60)
    print(f"  Base URL: {BASE_URL}")
    print(f"  Testing at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    try:
        # Test health
        if not test_health():
            print("❌ Health check failed. Is the API running?")
            return
        
        # Test signup
        user, user_data = test_signup()
        if not user:
            print("❌ Signup failed")
            return
        print(f"✅ Signup successful. User ID: {user.get('id')}")
        
        # Test login
        token = test_login(user_data)
        if not token:
            print("❌ Login failed")
            return
        print(f"✅ Login successful. Token: {token[:20]}...")
        
        # Test get current user
        if not test_get_current_user(user_data["username"], user_data["password"]):
            print("❌ Get current user failed")
            return
        print("✅ Get current user successful")
        
        # Test logout
        if not test_logout():
            print("❌ Logout failed")
            return
        print("✅ Logout successful")
        
        print("\n" + "="*60)
        print("  ✅ All tests passed!")
        print("="*60 + "\n")
        
    except requests.exceptions.ConnectionError:
        print("\n❌ Cannot connect to API. Make sure it's running on http://localhost:8000")
        print("   Run: npm run fastapi-dev\n")
    except Exception as e:
        print(f"\n❌ Error: {e}\n")

if __name__ == "__main__":
    main()
