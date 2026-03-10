// Load notes from localStorage on page load
        let notes = JSON.parse(localStorage.getItem('stickyNotes')) || [];

        function saveNotes() {
            localStorage.setItem('stickyNotes', JSON.stringify(notes));
        }

        function renderNotes() {
            const grid = document.getElementById('notesGrid');
            const emptyMsg = document.getElementById('emptyMessage');
            
            grid.innerHTML = '';
            
            if (notes.length === 0) {
                emptyMsg.style.display = 'block';
                return;
            }
            
            emptyMsg.style.display = 'none';
            
            notes.forEach((note, index) => {
                const noteEl = document.createElement('div');
                noteEl.className = 'note';
                
                noteEl.innerHTML = `
                    <input type="text" class="note-title" placeholder="Title" 
                           value="${escapeHtml(note.title)}" 
                           onchange="updateNote(${index}, 'title', this.value)">
                    <textarea class="note-content" placeholder="Write your note here..." 
                              onchange="updateNote(${index}, 'content', this.value)">${escapeHtml(note.content)}</textarea>
                    <div class="note-footer">
                        <span class="note-date">${formatDate(note.date)}</span>
                        <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
                    </div>
                `;
                
                grid.appendChild(noteEl);
            });
        }

        function createNote() {
            const newNote = {
                title: '',
                content: '',
                date: new Date().toISOString()
            };
            notes.push(newNote);
            saveNotes();
            renderNotes();
            
            // Focus on the new note's title input
            setTimeout(() => {
                const inputs = document.querySelectorAll('.note-title');
                inputs[inputs.length - 1].focus();
            }, 100);
        }

        function updateNote(index, field, value) {
            notes[index][field] = value;
            notes[index].date = new Date().toISOString();
            saveNotes();
        }

        function deleteNote(index) {
            if (confirm('Are you sure you want to delete this note?')) {
                notes.splice(index, 1);
                saveNotes();
                renderNotes();
            }
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        // Initial render
        renderNotes();