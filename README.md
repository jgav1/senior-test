
#################################
#Getting Started
To check the documentation and all the logic rationale: open AutoPartsPro Full Rationale.pdf

Moreover to see details of the implementation of the DB, check: senior-test\Documentation\DB

Finally instructions to run the app: 

execute from within the senior-test folder the following comand:
first go to the base folder which is 
\senior-test

Then open docker desktop. 

Then execute this command from the terminal:
docker compose up --build

After that, go the folder
\senior-test\warehouse-frontend
then execute the following:
npm i 
then execute the following:
npm run dev

With that the services must be running correctly. 

To access them you need to: 

Then to enter the services running:
Frontend:
- enter to localhost:3000 to enter the AutoPartsPro webpage
Api:
- enter to localhost:8000 to enter the API's documentation webpage
DB admin tools:
- enter to localhost:5050 to enter pgadmin. 

Check the explanation of the functionality here (in spanish):
https://www.youtube.com/watch?v=500o9DjHwAE 

How to run everything

###############################

# senior-test
# AutoPartsPro Technical Test

## Overview
Welcome to the AutoPartsPro technical test! This exercise evaluates your ability to design and implement a practical information system, solve real-world business problems, and communicate your thought process effectively.

## Company Background
AutoPartsPro is a mid-sized company specializing in:
- Motor vehicle parts sales
- Car repair services
- Retail store operations
- Service workshop management

## Business Challenge
The company faces inventory management challenges:
- Unexpected parts shortages
- Excess stock leading to waste
- Increased holding costs
- Need for optimal parts allocation for repair jobs

## Project Objective
Design and implement an information system that supports:
1. Management of:
   - Customers
   - Vehicles
   - Parts inventory
   - Repair orders
2. Optimal repair order selection based on:
   - Current inventory constraints
   - Maximum value (profit/priority) optimization

## Project Tasks

### 1. Database Design
**Objective**: Create a relational database schema supporting:
- Customers and vehicles
- Parts inventory (numbers, descriptions, stock levels, cost)
- Repair orders (parts, labor, status)

**Deliverables**:
- ER diagram
- Design choices explanation
- Normalization approach documentation

### 2. Backend Implementation
**Requirements**:
- CRUD operations for all entities
- Optimization endpoint for repair order selection
- API documentation

**Deliverables**:
- Source code
- API documentation
- Optimization approach explanation

### 3. Frontend Implementation
**Features**:
- Entity management interface
- Optimization results display
- Clean, intuitive UI

**Deliverables**:
- Source code
- Usage instructions

### 4. Documentation
**Required Explanations**:
- Database design decisions
- Backend logic choices
- Frontend structure rationale
- Trade-offs considered
- Business challenge solutions

## Best Practices & Expectations

### Time Management
- 5 working days completion target
- Focus on quality over quantity
- Prioritize core functionality

### Code Quality
- Clean, maintainable code
- Appropriate testing
- Well-structured architecture

### Documentation
- Clear assumptions
- Design decisions
- Limitations
- Thought process

### Frontend
- Functional key flows
- Basic styling
- Intuitive interface

## Submission Checklist
- [ ] ER diagram and database design explanation
- [ ] Backend source code and API documentation
- [ ] Frontend source code and usage instructions
- [ ] Written explanations of major design decisions and trade-offs

## Technical Requirements
- Relational database
- Backend API (language/framework of choice)
- Frontend framework (of choice)
- Testing framework
- Documentation tools

## Evaluation Criteria
1. System design quality
2. Code implementation
3. Problem-solving approach
4. Communication clarity
5. Technical decisions rationale

## Getting Started
1. Review the requirements
2. Plan your approach
3. Set up development environment
4. Begin with database design
5. Implement backend
6. Develop frontend
7. Document your work

## Notes
- Focus on demonstrating practical engineering skills
- Emphasize real-world problem-solving
- Maintain clear communication throughout
- Document all major decisions

Good luck with your implementation!

# Instructions on Running the program:
- docker compose up --build
- enter to localhost:8000 to enter the API's documentation webpage
- enter to localhost:3000 to enter the AutoPartsPro webpage
- enter to localhost:5050 to enter pgadmin. 

# Instructions on developing:
- use a venv for working with the backend:
   - python -m venv venv
- verify that the workspace was changed to the venv and that the python interpreter is the one of the venv otherwise in vscode execute:
   - Python select interpreter -> venv python interpreter
- activate the venv:
   - venv\Scripts\Activate
- install dependencies:
   - pip install -r requirements-dev.txt
- when done:
   - deactivate
