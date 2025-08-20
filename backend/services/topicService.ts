import { Topic } from '../models/Topic.js';

const TECH_TOPICS = [
  'Machine Learning',
  'Cloud Computing', 
  'Cybersecurity',
  'Web Development',
  'Mobile Development',
  'DevOps',
  'Blockchain',
  'Data Science',
  'Internet of Things',
  'Microservices',
  'API Design',
  'Database Design',
  'Software Architecture',
  'React Framework',
  'Node.js',
  'Python Programming',
  'JavaScript',
  'TypeScript',
  'Docker',
  'Kubernetes',
  'AWS',
  'Git Version Control',
  'Agile Development',
  'Test Driven Development',
  'GraphQL',
  'REST APIs',
  'SQL Databases',
  'NoSQL Databases',
  'Redis',
  'MongoDB',
  'PostgreSQL',
  'Artificial Intelligence',
  'Deep Learning',
  'Natural Language Processing',
  'Computer Vision',
  'Robotics',
  'Quantum Computing',
  'Edge Computing',
  'Serverless Computing',
  'Progressive Web Apps',
  'Single Page Applications',
  'Responsive Design',
  'UI/UX Design',
  'Frontend Frameworks',
  'Backend Development',
  'Full Stack Development',
  'Software Testing',
  'Performance Optimization',
  'Web Security',
  'OAuth',
  'JWT Tokens'
];

export class TopicService {
  static async getTodaysTopic(): Promise<Topic> {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    const timestamp = Date.now();
    
    // Use timestamp for truly random selection
    const randomIndex = Math.floor(Math.random() * TECH_TOPICS.length);
    const topicName = TECH_TOPICS[randomIndex];
    
    return {
      id: `topic-${timestamp}`,
      name: topicName,
      description: `Technology topic: ${topicName}`,
      date: dateString
    };
  }
}