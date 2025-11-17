// Test script to verify demo admin functionality
const testUsers = [
  { email: 'drsatish@skids.health', name: 'Demo Admin' },
  { email: 'regular@user.com', name: 'Regular User' },
  { email: 'test@example.com', name: 'Test User' }
];

// Mock the isDemoAdmin function
function isDemoAdmin(user) {
  return user?.email === 'drsatish@skids.health';
}

// Test the function
console.log('Testing Demo Admin Functionality:');
console.log('=====================================');

testUsers.forEach(user => {
  const result = isDemoAdmin(user);
  console.log(`User: ${user.name} (${user.email})`);
  console.log(`Is Demo Admin: ${result}`);
  console.log('---');
});

// Test lesson unlocking logic
function isLessonUnlocked(lessonId, isDemoAdmin, completedLessons) {
  console.log(`Checking lesson ${lessonId} unlock: isDemoAdmin=${isDemoAdmin}`);
  
  if (isDemoAdmin) {
    console.log('✅ Demo admin - lesson unlocked!');
    return true;
  }
  
  // Regular user logic would go here
  console.log('❌ Regular user - checking prerequisites...');
  return false;
}

console.log('\nTesting Lesson Unlock Logic:');
console.log('============================');

// Test with demo admin
isLessonUnlocked('lesson-1', true, new Set());
isLessonUnlocked('lesson-5', true, new Set());

// Test with regular user
isLessonUnlocked('lesson-1', false, new Set());

console.log('\n✅ Test script completed!');