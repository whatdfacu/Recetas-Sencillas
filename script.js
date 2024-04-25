document.getElementById('submitBtn').addEventListener('click', function() {
    var recipeInput = document.getElementById('recipeInput').value.trim();
    if (recipeInput !== '') {
        fetch('https://api.edamam.com/search?q=' + recipeInput + '&app_id=59f98997&app_key=e432e435e51d541b85bfe329fe6b3ed8')
        .then(response => response.json())
        .then(data => {
            var recipe = data.hits[0].recipe;
            var recipeHTML = `
                <h2>${recipe.label}</h2>
                <img src="${recipe.image}" alt="${recipe.label}">
                <h3>Ingredientes:</h3>
                <ul>
            `;
            recipe.ingredients.forEach(ingredient => {
                recipeHTML += `<li>${ingredient.text}</li>`;
            });
            recipeHTML += '</ul>';
            recipeHTML += `<h3>Instrucciones:</h3>`;
            if (recipe.totalTime) {
                recipeHTML += `<p>Tiempo de preparación: ${recipe.totalTime} minutos</p>`;
            }
            if (recipe.url) {
                recipeHTML += `<a href="${recipe.url}" target="_blank">Ver instrucciones detalladas</a>`;
            } else if (recipe.instructions) {
                recipeHTML += `<p>${recipe.instructions}</p>`;
            } else {
                recipeHTML += `<p>No se encontraron instrucciones.</p>`;
            }
            document.getElementById('recipeResults').innerHTML = recipeHTML;
        })
        .catch(error => {
            console.error('Error fetching recipe:', error);
            document.getElementById('recipeResults').innerHTML = '<p>Error al buscar la receta. Inténtalo de nuevo más tarde.</p>';
        });
    }
});
