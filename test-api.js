// Simple API test script for greybrain.ai
// This tests the Gemini API integration without requiring a full React environment

import { evaluateExercise, getChatbotResponse } from './services/geminiService.js';
import { CURRICULUM } from './constants.tsx';

async function testAPIIntegration() {
    console.log('🧪 Testing greybrain.ai API Integration...\n');
    
    // Test 1: Check environment variables
    console.log('1. Environment Variables:');
    console.log(`   API_KEY: ${process.env.API_KEY ? '✓ Set' : '✗ Not set'}`);
    console.log(`   GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? '✓ Set' : '✗ Not set'}`);
    
    if (!process.env.API_KEY && !process.env.GEMINI_API_KEY) {
        console.log('   ⚠️  No API key found. API tests will show fallback behavior.\n');
    }
    
    // Test 2: Exercise Evaluation
    console.log('2. Testing Exercise Evaluation:');
    try {
        const testPrompt = 'Create a simple JSON object with a name and age property';
        const testInput = '{"name": "John", "age": 25}';
        
        console.log(`   Prompt: ${testPrompt}`);
        console.log(`   Input: ${testInput}`);
        
        const result = await evaluateExercise(testPrompt, testInput);
        console.log(`   Result: ${JSON.stringify(result, null, 2)}`);
        console.log(`   ✓ Exercise evaluation completed\n`);
    } catch (error) {
        console.log(`   ✗ Exercise evaluation failed: ${error.message}\n`);
    }
    
    // Test 3: Chatbot Response
    console.log('3. Testing Chatbot Response:');
    try {
        const testModule = CURRICULUM[0]; // First module
        const curriculumSummary = CURRICULUM.map(m => `${m.title}: ${m.description}`).join('\n');
        const chatHistory = [];
        const userQuery = 'What is an API?';
        
        console.log(`   Module: ${testModule.title}`);
        console.log(`   Query: ${userQuery}`);
        
        const response = await getChatbotResponse(testModule, curriculumSummary, chatHistory, userQuery);
        console.log(`   Response: ${response.substring(0, 100)}...`);
        console.log(`   ✓ Chatbot response completed\n`);
    } catch (error) {
        console.log(`   ✗ Chatbot response failed: ${error.message}\n`);
    }
    
    // Test 4: Data Structure Validation
    console.log('4. Testing Data Structures:');
    console.log(`   Curriculum modules: ${CURRICULUM.length}`);
    
    let totalLessons = 0;
    let quizCount = 0;
    let exerciseCount = 0;
    
    CURRICULUM.forEach(module => {
        totalLessons += module.lessons.length;
        module.lessons.forEach(lesson => {
            if (lesson.type === 'quiz') quizCount++;
            if (lesson.type === 'exercise') exerciseCount++;
        });
    });
    
    console.log(`   Total lessons: ${totalLessons}`);
    console.log(`   Quiz lessons: ${quizCount}`);
    console.log(`   Exercise lessons: ${exerciseCount}`);
    console.log(`   ✓ Data structure validation completed\n`);
    
    console.log('🎉 API Integration tests completed!');
    console.log('\n📝 Notes:');
    console.log('   - If API key is not set, services will return fallback responses');
    console.log('   - For full testing, set GEMINI_API_KEY in .env.local');
    console.log('   - The app gracefully handles API failures');
}

// Run the tests
testAPIIntegration().catch(console.error);
